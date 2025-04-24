from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from database.base_model import BaseModel

"""
this file contains to classes that are modelled into two
database models
"""

class Doctor(BaseModel):
  __tablename__ = "doctors"

  name = Column(String(100), nullable=False)
  email = Column(String(100), nullable=False, unique=True)
  hash_password = Column(String(255), nullable=False)

  clients = relationship("Client", back_populates="doctor")


class Client(BaseModel):
  __tablename__ = "clients"

  name = Column(String(100), nullable=False)
  gender = Column(String(100), nullable=False)
  dob = Column(Date)
  doctor_id = Column(String(256), ForeignKey("doctors.id"))

  doctor = relationship("Doctor", back_populates="clients")
  enrollments = relationship("Enrollment", back_populates="client")