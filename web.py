from flask import Flask, flash, redirect, render_template, request, session
import os
import json
from werkzeug import serving
import ssl
from tool import control_db as db

context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
context.load_cert_chain("server.crt", "server.key")

app = Flask(__name__)

@app.route('/')
def show_user_api():
	return render_template('user_api.html')

@app.route('/sign_up/<string:account>/<string:password>/<string:name>')
def sign_up(account, password, name):
	try:
		result = db().add_new_user(account, password, name)
	except:
		result = -1
	return {"result": result, "account": account, "name": name}

@app.route('/get_login/<string:account>')
def get_login(account):
	result = db().get_password(account)
	return {"password": result}

@app.route('/get_score/<string:account>')
def get_score(account):
	result = db().get_score(account)
	return result

@app.route('/add_win/<string:account>')
def add_win(account):
	try:
		result = db().add_win_and_update_score(account)
	except:
		result = -1
	return {"result": result}

@app.route('/add_lose/<string:account>')
def add_lose(account):
	try:
		result = db().add_lose_and_update_score(account)
	except:
		result = -1
	return {"result": result}

if __name__ == '__main__':
    app.secret_key = os.urandom(12)
    serving.run_simple("127.0.0.1", 5000, app, ssl_context=context, threaded=True)