from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

pwd_context = CryptContext(schemas=["bycrpt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """_summary_

    Args:
        plain_password (str): passsword thats going to be created 
        hashed_password (str): password that was created but then hashed afterwards

    Returns:
        bool: should return boolean value
    """
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """_summary_

    Args:
        password (str): password that will be hashed

    Returns:
        str: returns the hashed password
    """
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """_summary_

    Args:
        data (dict): data that will be used to create the token
        expires_delta (Optional[timedelta], optional): time delta for the token to expire. Defaults to None.

    Returns:
        str: returns the token
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode()