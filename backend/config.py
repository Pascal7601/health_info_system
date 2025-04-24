"""
this file contains main configurations of the project
"""
from os import getenv
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

# supabase configuration
supabase_url = getenv('SUPABASE_URL')
supabase_api_key = getenv('SUPABASE_API_KEY')

supab = create_client(supabase_url, supabase_api_key) # create a supabase client

# database configuration
database_url = getenv('DATABASE_URL')

# JWT configuration
EXPIRY = getenv('EXPIRY')
ALGORITHM = getenv('ALGORITHM')
SECRET_KEY = getenv('SECRET_KEY')
