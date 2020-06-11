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
		err = None
		if account == "" or password == "" or name == "":
			return 2
		try:
			sql = "INSERT INTO `user`.`profile` (`account`, `password`, `name`, `score`, `win`, `lose`, `money`) VALUES ('" + account + "', '" + password + "', '" + name + "', '0', '0', '0', '10');"
			self.mysql_qae_cursor.execute(sql)
			mysql_result = self.mysql_qae_cursor.fetchall()
			self.mysql_qae.commit()
			result = 0
		except Exception as e:
			err = str(e)
			if 'Duplicate' in e:
				result = 1
			else:
				result = -1
		return result, err

	@__db
	def get_password(self, account):
		err = None
		sql = "SELECT password FROM `user`.`profile` WHERE account = '" + account + "';"
		self.mysql_qae_cursor.execute(sql)
		mysql_result = self.mysql_qae_cursor.fetchall()
		self.mysql_qae.commit()
		try:
			result = mysql_result[0]['password']
		except Exception as e:
			err = str(e)
			result = 0
		return result, err

	@__db
	def get_score(self, account):
		e = None
		sql = "SELECT score, win, lose FROM `user`.`profile` WHERE account = '" + account + "';"
		self.mysql_qae_cursor.execute(sql)
		mysql_result = self.mysql_qae_cursor.fetchall()
		self.mysql_qae.commit()
		try:
			result = mysql_result[0]
		except Exception as e:
			result = {"score": -1, "win": -1, "lose": -1, "exception": str(e)}
		return result

	@__db
	def add_win_and_update_score(self, account):
		err = None
		try:
			sql = "UPDATE `user`.`profile` SET `score`=`score`+30, `win`=`win`+1, `lose`=`lose`-1 WHERE  `account`='" + account + "';"
			self.mysql_qae_cursor.execute(sql)
			mysql_result = self.mysql_qae_cursor.fetchall()
			self.mysql_qae.commit()
			result = 0
		except Exception as e:
			if 'range' in str(e):
				sql = "UPDATE `user`.`profile` SET `score`=`score`+30, `win`=`win`+1, `lose`=0 WHERE  `account`='" + account + "';"
				self.mysql_qae_cursor.execute(sql)
				mysql_result = self.mysql_qae_cursor.fetchall()
				self.mysql_qae.commit()
				result = 0
			else:
				err = str(e)
				result = -1
		return result, err

	@__db
	def add_lose_and_update_score(self, account):
		err = None
		try:
			sql = "UPDATE `user`.`profile` SET `score`=`score`-10, `lose`=`lose`+1 WHERE  `account`='" + account + "';"
			self.mysql_qae_cursor.execute(sql)
			mysql_result = self.mysql_qae_cursor.fetchall()
			self.mysql_qae.commit()
			result = 0
		except Exception as e:
			if 'range' in str(e):
				sql = "UPDATE `user`.`profile` SET `score`=0, `lose`=`lose`+1 WHERE  `account`='" + account + "';"
				self.mysql_qae_cursor.execute(sql)
				mysql_result = self.mysql_qae_cursor.fetchall()
				self.mysql_qae.commit()
				result = 0
			else:
				err = str(e)
				result = -1
		return result, err

	@__db
	def determine_rival(self, account, rival):
		err = None
		rival_string = ""
		for rival_account in rival:
			rival_string += ", '" + rival_account + "'"
		rival_string = rival_string[2:]
		try:
			sql = "SELECT account FROM `user`.`profile` WHERE \
			CASE WHEN (SELECT score FROM `user`.`profile` WHERE account = '" + account + "') > score \
			THEN (SELECT score FROM `user`.`profile` WHERE account = '" + account + "')-score \
			ELSE score-(SELECT score FROM `user`.`profile` WHERE account = '" + account + "') \
			END = (SELECT MIN(CASE WHEN (SELECT score FROM `user`.`profile` WHERE account = '" + account + "') > score \
			THEN (SELECT score FROM `user`.`profile` WHERE account = '" + account + "')-score \
			ELSE score-(SELECT score FROM `user`.`profile` WHERE account = '" + account + "') END) FROM `user`.`profile` WHERE account IN (" + rival_string + "));"
			self.mysql_qae_cursor.execute(sql)
			mysql_result = self.mysql_qae_cursor.fetchall()
			self.mysql_qae.commit()
			result = mysql_result[0]['account']
		except Exception as e:
			err = str(e)
			result = 0
		return result, err