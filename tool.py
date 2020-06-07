import sys
from datetime import datetime
import os
import pymysql
import time
import io
import csv
import pandas as pd
import re
import json
import requests

MYSQL_QAE_URI = os.environ["MYSQL_QAE_URI"]
MYSQL_QAE_USER = os.environ["MYSQL_QAE_USER"]
MYSQL_QAE_PASS = os.environ["MYSQL_QAE_PASS"]
MYSQL_QAE_DB = os.environ["MYSQL_QAE_DB"]

class control_db(object):
	def __init__(self):
		self.mysql_qae = pymysql.connect(host=MYSQL_QAE_URI, user=MYSQL_QAE_USER, password=MYSQL_QAE_PASS, db=MYSQL_QAE_DB,  cursorclass=pymysql.cursors.DictCursor)
		self.mysql_qae_cursor = self.mysql_qae.cursor()

	def __db(func):
		def reconnect_db(self, *args):
			self.mysql_qae.ping(reconnect=True)
			return func(self, *args)
		return reconnect_db

	@__db
	def add_new_user(self, account, password, name):
		if account == "" or password == "" or name == "":
			return 2
		try:
			sql = "INSERT INTO `user`.`profile` (`account`, `password`, `name`, `score`, `money`) VALUES ('" + account + "', '" + password + "', '" + name + "', '0', '10');"
			self.mysql_qae_cursor.execute(sql)
			mysql_result = self.mysql_qae_cursor.fetchall()
			self.mysql_qae.commit()
			result = 0
		except Exception as e:
			if 'Duplicate' in e:
				result = 1
			else:
				result = -1
		return result

	@__db
	def get_password(self, account):
		sql = "SELECT password FROM `user`.`profile` WHERE account = '" + account + "';"
		self.mysql_qae_cursor.execute(sql)
		mysql_result = self.mysql_qae_cursor.fetchall()
		self.mysql_qae.commit()
		try:
			result = mysql_result[0]['password']
		except:
			result = 0
		return result