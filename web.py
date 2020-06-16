from flask import Flask, flash, redirect, render_template, request, session
import os
import json
from werkzeug import serving
import ssl
from tool import control_db as db
from flask_socketio  import SocketIO, emit

import random

# context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
# context.load_cert_chain("server.crt", "server.key")

app = Flask(__name__)
#app.secret_key = os.urandom(12)

socketio = SocketIO(app, cors_allowed_origins='*')

@app.route('/')
def show_user_api():
    return render_template('user_api.html')

@socketio.on('connection')
def connected_msg(msg):
    print(msg['data'])
    emit('server_response', {'data': 'Connected!'})

@socketio.on('CREATE_GAME')
def game_recv(game):
    print('[DEBUG] GAME_RECEIVE')
    game['id'] = random.randint(1000000, 9999999)
    print(game)
    emit('RECEIVE_GAME', game, broadcast=True);

@socketio.on('JOIN_GAME')
def join_game(game):
    emit('START_GAME', game, broadcast=True);

@app.route('/sign_up/<string:account>/<string:password>/<string:name>')
def sign_up(account, password, name):
    try:
        result, e = db().add_new_user(account, password, name)
    except:
        result = -1
        e = "Unknown error"
    return {"result": result, "account": account, "name": name, "exception": e}

@app.route('/get_login/<string:account>')
def get_login(account):
    result, e = db().get_password(account)
    return {"password": result, "exception": e}

@app.route('/get_score/<string:account>')
def get_score(account):
    result = db().get_score(account)
    return result

@app.route('/pvp/add_win/<string:account>')
def add_win_p(account):
    try:
        result, e = db().add_win_and_update_score_p(account)
    except:
        result = -1
        e = "Unknown error"
    return {"result": result, "exception": e}

@app.route('/pvp/add_lose/<string:account>')
def add_lose_p(account):
    try:
        result, e = db().add_lose_and_update_score_p(account)
    except:
        result = -1
        e = "Unknown error"
    return {"result": result, "exception": e}

@app.route('/pve/add_win/<string:account>')
def add_win_e(account):
    try:
        result, e = db().add_win_and_update_score_e(account)
    except:
        result = -1
        e = "Unknown error"
    return {"result": result, "exception": e}

@app.route('/pve/add_lose/<string:account>')
def add_lose_e(account):
    try:
        result, e = db().add_lose_and_update_score_e(account)
    except:
        result = -1
        e = "Unknown error"
    return {"result": result, "exception": e}

@app.route('/online/<string:account>/<path:rival>')
def determine_rival(account, rival):
    rival_list = []
    if '/' in rival:
        rival_list= rival.split('/')
    else:
        rival_list.append(rival)
    result, e = db().determine_rival(account, rival_list)
    return {"rival": result, "exception": e}

if __name__ == '__main__':
#    serving.run_simple("127.0.0.1", 5000, app, ssl_context=context, threaded=True)
#    serving.run_simple("140.112.30.46", 7878, app, ssl_context=context, threaded=True)
    socketio.run(app, debug=True, host='127.0.0.1', port=5000, certfile='server.crt', keyfile='server.key')
