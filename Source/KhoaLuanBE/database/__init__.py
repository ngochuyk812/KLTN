from databases import Database

DATABASE_URL = "mysql+aiomysql://root:@localhost/khoaluan"
database = Database(DATABASE_URL)