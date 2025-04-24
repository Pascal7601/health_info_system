from sqlalchemy import Column, Integer, String, Date, ForeignKey,Text
from sqlalchemy.orm import relationship
from database.base_model import BaseModel

class Program(BaseModel):
  __tablename__ = "programs"

  name = Column(String(100), nullable=False, unique=True)
  description = Column(Text)

  enrollments = relationship("Enrollment", back_populates="program")

class Enrollment(BaseModel):
  __tablename__ = "enrollments"

  client_id = Column(String(256), ForeignKey("clients.id"), nullable=False)
  program_id = Column(String(256), ForeignKey("programs.id"), nullable=False)

  client = relationship("Client", back_populates="enrollments")
  program = relationship("Program", back_populates="enrollments")