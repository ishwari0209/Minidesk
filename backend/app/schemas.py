from pydantic import BaseModel, EmailStr


class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    budget: str
    message: str


class LeadResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    budget: str
    message: str
    status: str

    class Config:
        from_attributes = True
class LeadStatusUpdate(BaseModel):
    status: str
class AdminSignup(BaseModel):
    email: EmailStr
    password: str


class AdminLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str