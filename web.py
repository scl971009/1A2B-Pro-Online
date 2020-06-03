from flask import Flask, flash, redirect, render_template, request, session
import os
#from bson.json_util import dumps
import json
from werkzeug import serving
import ssl
import hashlib
import subprocess
import sys

context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
context.load_cert_chain("server.crt", "server.key")

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('a.html')

if __name__ == '__main__':
    app.secret_key = os.urandom(12)
    serving.run_simple("127.0.0.1", 3456, app, ssl_context=context, threaded=True)
