import pymysql
import json

class control_db(object):
	def __init__(self):
		self.mysql_qae = pymysql.connect(host="cnl-1a2b-pro-online.clzqdkl7yu2l.us-east-1.rds.amazonaws.com", user="Group7", password="Group7root", db="user",  cursorclass=pymysql.cursors.DictCursor)
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