import pymysql
import json

class control_db(object):
	def __init__(self):
		self.mysql = pymysql.connect(host="cnl-1a2b-pro-online.clzqdkl7yu2l.us-east-1.rds.amazonaws.com", user="Group7", password="Group7root", db="user",  cursorclass=pymysql.cursors.DictCursor)
		self.mysql_cursor = self.mysql.cursor()

	def __db(func):
		def reconnect_db(self, *args):
			self.mysql.ping(reconnect=True)
			return func(self, *args)
		return reconnect_db

	@__db
	def add_new_user(self, account, password, name):
		err = "Success"
		try:
			sql = "INSERT INTO `user`.`profile` (`account`, `password`, `name`, `score`, `win_p`, `lose_p`, `win_e`, `lose_e`, `money`) VALUES ('" + account + "', '" + password + "', '" + name + "', '0', '0', '0', '0', '0', '10');"
			self.mysql_cursor.execute(sql)
			mysql_result = self.mysql_cursor.fetchall()
			self.mysql.commit()
			result = 0
		except Exception as e:
			err = str(e)
			if 'Duplicate' in err:
				result = 1
			else:
				result = -1
		return result, err

	@__db
	def get_password(self, account):
		err = "Success"
		sql = "SELECT password FROM `user`.`profile` WHERE account = '" + account + "';"
		self.mysql_cursor.execute(sql)
		mysql_result = self.mysql_cursor.fetchall()
		self.mysql.commit()
		try:
			result = mysql_result[0]['password']
		except Exception as e:
			err = str(e)
			result = 0
		return result, err

	@__db
	def get_score(self, account):
		err = "Success"
		sql = "SELECT score, win_p, lose_p, win_e, lose_e FROM `user`.`profile` WHERE account = '" + account + "';"
		self.mysql_cursor.execute(sql)
		mysql_result = self.mysql_cursor.fetchall()
		self.mysql.commit()
		try:
			result = mysql_result[0]
			score = result["score"]
			win_p = result["win_p"]
			lose_p = result["lose_p"]
			win_e = result["win_e"]
			lose_e = result["lose_e"]
			result = result = {"score": score, "win_p": win_p, "lose_p": lose_p, "win_e": win_e, "lose_e": lose_e, "exception": err}
		except Exception as e:
			err = str(e)
			result = {"score": -1, "win_p": -1, "lose_p": -1, "win_e": -1, "lose_e": -1, "exception": err}
		return result

	@__db
	def add_win_and_update_score_p(self, account):
		err = "Success"
		try:
			sql = "UPDATE `user`.`profile` SET `score`=`score`+30, `win_p`=`win_p`+1, `lose_p`=`lose_p`-1 WHERE  `account`='" + account + "';"
			self.mysql_cursor.execute(sql)
			mysql_result = self.mysql_cursor.fetchall()
			self.mysql.commit()
			result = 0
		except Exception as e:
			if 'range' in str(e):
				sql = "UPDATE `user`.`profile` SET `score`=`score`+30, `win_p`=`win_p`+1, `lose_p`=0 WHERE  `account`='" + account + "';"
				self.mysql_cursor.execute(sql)
				mysql_result = self.mysql_cursor.fetchall()
				self.mysql.commit()
				result = 0
			else:
				err = str(e)
				result = -1
		return result, err

	@__db
	def add_lose_and_update_score_p(self, account):
		err = "Success"
		try:
			sql = "UPDATE `user`.`profile` SET `score`=`score`-10, `lose_p`=`lose_p`+1 WHERE  `account`='" + account + "';"
			self.mysql_cursor.execute(sql)
			mysql_result = self.mysql_cursor.fetchall()
			self.mysql.commit()
			result = 0
		except Exception as e:
			if 'range' in str(e):
				sql = "UPDATE `user`.`profile` SET `score`=0, `lose_p`=`lose_p`+1 WHERE  `account`='" + account + "';"
				self.mysql_cursor.execute(sql)
				mysql_result = self.mysql_cursor.fetchall()
				self.mysql.commit()
				result = 0
			else:
				err = str(e)
				result = -1
		return result, err

	@__db
	def add_win_and_update_score_e(self, account):
		err = "Success"
		try:
			sql = "UPDATE `user`.`profile` SET `score`=`score`+30, `win_e`=`win_e`+1, `lose_e`=`lose_e`-1 WHERE  `account`='" + account + "';"
			self.mysql_cursor.execute(sql)
			mysql_result = self.mysql_cursor.fetchall()
			self.mysql.commit()
			result = 0
		except Exception as e:
			if 'range' in str(e):
				sql = "UPDATE `user`.`profile` SET `score`=`score`+30, `win_e`=`win_e`+1, `lose_e`=0 WHERE  `account`='" + account + "';"
				self.mysql_cursor.execute(sql)
				mysql_result = self.mysql_cursor.fetchall()
				self.mysql.commit()
				result = 0
			else:
				err = str(e)
				result = -1
		return result, err

	@__db
	def add_lose_and_update_score_e(self, account):
		err = "Success"
		try:
			sql = "UPDATE `user`.`profile` SET `score`=`score`-10, `lose_e`=`lose_e`+1 WHERE  `account`='" + account + "';"
			self.mysql_cursor.execute(sql)
			mysql_result = self.mysql_cursor.fetchall()
			self.mysql.commit()
			result = 0
		except Exception as e:
			if 'range' in str(e):
				sql = "UPDATE `user`.`profile` SET `score`=0, `lose_e`=`lose_e`+1 WHERE  `account`='" + account + "';"
				self.mysql_cursor.execute(sql)
				mysql_result = self.mysql_cursor.fetchall()
				self.mysql.commit()
				result = 0
			else:
				err = str(e)
				result = -1
		return result, err

	@__db
	def determine_rival(self, account, rival):
		err = "Success"
		rival_string = ""
		for rival_account in rival:
			rival_string += ", '" + rival_account + "'"
		rival_string = rival_string[2:]
		try:
			sql = "SELECT account FROM `user`.`profile` WHERE \
			(CASE WHEN (SELECT score FROM `user`.`profile` WHERE account = '" + account + "') > score \
			THEN (SELECT score FROM `user`.`profile` WHERE account = '" + account + "')-score \
			ELSE score-(SELECT score FROM `user`.`profile` WHERE account = '" + account + "') \
			END = (SELECT MIN(CASE WHEN (SELECT score FROM `user`.`profile` WHERE account = '" + account + "') > score \
			THEN (SELECT score FROM `user`.`profile` WHERE account = '" + account + "')-score \
			ELSE score-(SELECT score FROM `user`.`profile` WHERE account = '" + account + "') END) FROM `user`.`profile` WHERE account IN (" + rival_string + ")))\
			AND account IN (" + rival_string + ");"
			self.mysql_cursor.execute(sql)
			mysql_result = self.mysql_cursor.fetchall()
			self.mysql.commit()
			result = mysql_result[0]['account']
		except Exception as e:
			err = str(e)
			result = 0
		return result, err