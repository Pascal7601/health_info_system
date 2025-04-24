from pydantic import BaseModel
from datetime import datetime


class DoctorCreate(BaseModel):
  name: str
  email: str
  password: str

class DoctorLogin(BaseModel):
  email: str
  password: str

class ClientCreate(BaseModel):
  name: str
  gender: str
  dob: datetime
