from fastapi import Depends, APIRouter
from fastapi.security import HTTPBasicCredentials
from sqlalchemy.orm import Session
from database.connection import get_db
from utils.errors import HTTPError
from users.models import Doctor, Client
from .schemas import DoctorCreate, DoctorLogin, ClientCreate
from auth.auth import AuthHandler, security

user_router = APIRouter(tags=['user'])

@user_router.post("/sign_up")
def create_doctor_acc(user: DoctorCreate, db: Session = Depends(get_db)):
  """
  create an account for a doctor (system admin)
  """
  existing_doctor = db.query(Doctor).filter(Doctor.email == user.email).first()
  if existing_doctor:
    raise HTTPError.bad_request('doctor already registered in the system, proceed to login')
  hash_pwd = AuthHandler.get_passd_hash(user.password) # hash password before saving in db
  doctor = Doctor(
    name=user.name,
    email=user.email,
    hash_password=hash_pwd
  )
  db.add(doctor)
  db.commit()
  return {'message': 'succesfully created an account'}

@user_router.post('/login')
def login(user: DoctorLogin, db: Session = Depends(get_db)):
  """
  login into the account as a doctor
  """
  doctor = db.query(Doctor).filter(Doctor.email == user.email).first() # check if email exixts in db
  if not doctor:
    raise HTTPError.not_found('email not found , kindly register an account')
  
  if not AuthHandler.verify_password(user.password, doctor.hash_password): # verify the plain password entered
    raise HTTPError.bad_request('wrong password')
  
  token = AuthHandler.generate_token({'sub': user.email})
  return {'access_token': token, 'token_type': 'bearer'}


@user_router.post('/client/register')
def register_client(
  client: ClientCreate, db: Session = Depends(get_db),
  credentials: HTTPBasicCredentials = Depends(security)
):
  """
  register a new client in the system
  """
  payload = AuthHandler.decode_token(credentials.credentials)
  doctor_email = payload.get('sub')
  print(doctor_email)
  if not doctor_email:
    raise HTTPError.unauthorized("cannot register a client")
  
  doctor = db.query(Doctor).filter(Doctor.email == doctor_email).first()
  client = Client(
    name=client.name,
    gender=client.gender,
    dob=client.dob,
    doctor_id=doctor.id
  )
  db.add(client)
  db.commit()
  db.refresh(client)
  return {"message": "succesfully registered a client"}


@user_router.get('/client/{client_id}')
def get_client_by_id(
  client_id: str, db: Session = Depends(get_db),
  credentials: HTTPBasicCredentials = Depends(security)
):
  """
  search client by their id
  """
  payload = AuthHandler.decode_token(credentials.credentials)
  doctor_email = payload.get('sub')
  print(doctor_email)
  if not doctor_email:
    raise HTTPError.unauthorized("cannot search a client")
  
  client = db.query(Client).filter(Client.id == client_id).first()
  if not client:
    raise HTTPError.not_found('client not found')
  return client

@user_router.get('/clients')
def get_all_clients(
  db: Session = Depends(get_db),
  credentials: HTTPBasicCredentials = Depends(security)
):
  doctor_email = AuthHandler.decode_token(credentials.credentials)
  if not doctor_email:
    raise HTTPError.unauthorized("cannot search a client")
    
  clients = db.query(Client).all()
  if not clients:
    raise HTTPError.not_found('client not found')
  return clients