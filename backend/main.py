from database.connection import Base, engine
from fastapi import FastAPI
from users.models import Client, Doctor
from programs.models import Enrollment, Program
from users.views import user_router
from programs.views import program_router
from fastapi.middleware.cors import CORSMiddleware

# Base.metadata.create_all(bind=engine) # create all the tables
# Base.metadata.drop_all(bind=engine)

app = FastAPI()

app.include_router(user_router, prefix='/api')
app.include_router(program_router, prefix='/api')

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"], 
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.get('/')
def home():
  return {'message': 'welcome to health management system'}

# run server only when executed directly
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)