from passlib.context import CryptContext
from fastapi.security import HTTPBearer
import jwt
from jwt import PyJWTError
import config
from datetime import datetime, timedelta
from utils.errors import HTTPError

security = HTTPBearer()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class AuthHandler:
  def verify_password(plain_passd, hashed_passd):
    """
    verify the password entered by the user
    """
    return pwd_context.verify(plain_passd, hashed_passd)
  
  def get_passd_hash(passd):
    """
    hash the password entered by the user
    """
    return pwd_context.hash(passd)
  

  def generate_token(data: dict):
    """
    generate token for user when thry login
    """
    try:
        expiry = datetime.utcnow() + timedelta(seconds=int(config.EXPIRY))
        data.update({"exp": expiry})

        jwt_token = jwt.encode(data, config.SECRET_KEY, algorithm=config.ALGORITHM)
        return jwt_token
    
    except PyJWTError as e:
        raise HTTPError.internal_server_error("Internal server error")
      
  def decode_token(token: str):
    """
    decode the token and return the payload
    """
    try:
        payload = jwt.decode(token, config.SECRET_KEY, algorithms=[config.ALGORITHM])
        return payload
    
    except PyJWTError as e:
        raise HTTPError.unauthorized("Token has expired")