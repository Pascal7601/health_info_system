from pydantic import BaseModel

class ProgramCreate(BaseModel):
  name: str
  description: str