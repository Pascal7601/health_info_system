from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import config
from sqlalchemy.ext.declarative import declarative_base

# Create a database connection
try:
  engine = create_engine(config.database_url, echo=True)
  engine.connect()
  print('succesfully created a database connection')
except Exception as e:
  print("An error occurred while connecting to the database:", str(e))
  engine = None

# Create a session
session = sessionmaker(bind=engine)

Base = declarative_base()

def get_db():
  db = session() # create an instance of a session
  try:
      yield db
  finally:
      db.close()