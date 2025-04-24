from fastapi import Depends, APIRouter
from fastapi.security import HTTPBasicCredentials
from sqlalchemy.orm import Session
from database.connection import get_db
from utils.errors import HTTPError
from .models import Program, Enrollment
from .schemas import ProgramCreate
from users.models import Client
from auth.auth import AuthHandler, security

program_router = APIRouter(tags=['program'])

@program_router.post('/program/new')
def create_program(
  program: ProgramCreate, db: Session = Depends(get_db),
  credentials: HTTPBasicCredentials = Depends(security)
):
  """
  create a new health program
  """
  payload = AuthHandler.decode_token(credentials.credentials) # obtain the token from the header
  doctor_email = payload.get('sub') # obtain docto's email
  if not doctor_email:
    raise HTTPError.unauthorized('cannot create program') # must be authenticated to create a program
  
  exist_program = db.query(Program).filter(Program.name == program.name).first()
  if exist_program:
    raise HTTPError.bad_request("program already exists")
  pg = Program(
    name=program.name,
    description=program.description
  )
  db.add(pg)
  db.commit()
  db.refresh(pg)
  return {"message": "program added succesfully"}

@program_router.get('/programs')
def get_all_programs(
  db: Session = Depends(get_db),
  credentials: HTTPBasicCredentials = Depends(security)
):
  """
  get all health programs in the system
  """
  programs = db.query(Program).all()
  return programs

@program_router.post('/program/{program_id}/{client_id}')
def add_client_in_program(
  program_id: str, client_id: str, db: Session = Depends(get_db),
  credentials: HTTPBasicCredentials = Depends(security)
):
  payload = AuthHandler.decode_token(credentials.credentials) # obtain the token from the header
  doctor_email = payload.get('sub') # obtain docto's email
  if not doctor_email:
    raise HTTPError.unauthorized('cannot create program') # must be authenticated to create a program
  
  program = db.query(Program).filter(Program.id == program_id).first()
  if not program:
    raise HTTPError.not_found('program does not exist')
  
  client = db.query(Client).filter(Client.id == client_id).first()
  if not client:
    raise HTTPError("client is not found in the system")
  
  enroll = Enrollment(
    client_id=client.id,
    program_id=program.id
  )
  db.add(enroll)
  db.commit()
  db.refresh(enroll)
  return {"message": f"client added succesfully to {program.name} program"}

@program_router.get('/{program_id}/clients')
def get_clients_from_program(
  program_id: str, db: Session = Depends(get_db),
  credentials: HTTPBasicCredentials = Depends(security)
):
  """
  get clients from a certain program
  """
  payload = AuthHandler.decode_token(credentials.credentials) # obtain the token from the header
  doctor_email = payload.get('sub') # obtain docto's email
  if not doctor_email:
    raise HTTPError.unauthorized('cannot create program') # must be authenticated to create a program
  
  program = db.query(Program).filter(Program.id == program_id).first()
  if not program:
    raise HTTPError.not_found('program does not exist')
  
  # Get all enrollment records for this program
  enrollments = db.query(Enrollment).filter(Enrollment.program_id == program_id).all()

  client_ids = [enroll.client_id for enroll in enrollments] # Get all clients associated with these enrollments
  clients = db.query(Client).filter(Client.id.in_(client_ids)).all()

  return clients