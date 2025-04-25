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
  payload = AuthHandler.decode_token(credentials.credentials) # obtain the token from the header
  doctor_email = payload.get('sub') # obtain docto's email
  if not doctor_email:
    raise HTTPError.unauthorized('cannot create program') # must be authenticated to create a program
  programs = db.query(Program).all()
  return programs

@program_router.post('/program/{program_id}/{client_name}')
def add_client_in_program(
  program_id: str, client_name: str, db: Session = Depends(get_db),
  credentials: HTTPBasicCredentials = Depends(security)
):
  """
  add client in a program
  """
  payload = AuthHandler.decode_token(credentials.credentials) # obtain the token from the header
  doctor_email = payload.get('sub') # obtain docto's email
  if not doctor_email:
    raise HTTPError.unauthorized('cannot create program') # must be authenticated to create a program
  
  program = db.query(Program).filter(Program.id == program_id).first()
  if not program:
    raise HTTPError.not_found('program does not exist')
  
  client = db.query(Client).filter(Client.name == client_name).first()
  if not client:
    raise HTTPError.not_found("client is not found in the system")

  enrolled = db.query(Enrollment).filter(Enrollment.client_id == client.id).first()
  if enrolled:
    raise HTTPError.bad_request('client already enrolled in program')
  
  enroll = Enrollment(
    client_id=client.id,
    program_id=program.id
  )
  db.add(enroll)
  db.commit()
  db.refresh(enroll)
  return {"message": f"client added succesfully to {program.name} program"}

@program_router.get('/{client_id}/programs')
def get_clients_from_program(
  client_id: str, db: Session = Depends(get_db),
  credentials: HTTPBasicCredentials = Depends(security)
):
  """
  get programs in which a client is enrolled in
  """
  payload = AuthHandler.decode_token(credentials.credentials) # obtain the token from the header
  doctor_email = payload.get('sub') # obtain docto's email
  if not doctor_email:
    raise HTTPError.unauthorized('cannot create program') # must be authenticated to create a program
  
  client = db.query(Program).filter(Client.id == client_id).first()
  if not client:
    raise HTTPError.not_found('client does not exist')
  
  # Get all enrollment records for this client
  enrollments = db.query(Enrollment).filter(Enrollment.client_id == client_id).all()

  # Get the program ids from the enrollment records
  program_ids = [enrollment.program_id for enrollment in enrollments]

  # Query the Program table to get the actual program details
  programs = db.query(Program).filter(Program.id.in_(program_ids)).all()

  return programs