from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
import logging
from sqlalchemy import select
from datetime import datetime, timedelta
import uuid
import os
from jose import JWTError, jwt
from dotenv import load_dotenv
from app.core.security import verify_password, get_password_hash
from app import models, schemas
from app.db import get_db
from sqlalchemy.future import select
from app.models import User

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter()
   



def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(datetime.timezone.utc) + expires_delta
    else:
        expire = datetime.now(datetime.timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt



async def get_user_by_username(db: AsyncSession, username: str):
    """Fetch a user by their username."""
    result = await db.execute(select(models.User).filter(models.User.username == username))
    return result.scalars().first()



async def create_user(db: AsyncSession, user: schemas.UserCreate):
    """Create a new user."""
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

async def update_user_service(db: AsyncSession, user_id: uuid.UUID, user: schemas.UserUpdate):
    """Update an existing user."""
    db_user = await db.get(models.User, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    update_data = user.dict(exclude_unset=True)

    if 'password' in update_data:
        update_data['hashed_password'] = get_password_hash(update_data.pop('password'))

    for key, value in update_data.items():
        setattr(db_user, key, value)

    await db.commit()
    await db.refresh(db_user)
    return db_user


@router.put("/update_user/{user_id}")
async def update_user_endpoint(user_id: uuid.UUID, user: schemas.UserUpdate, db: AsyncSession = Depends(get_db)):
    updated_user = await update_user_service(db=db, user=user, user_id=user_id)
    return updated_user


async def get_current_user(db: AsyncSession = Depends(get_db), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = await get_user_by_username(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

@router.post("/register", response_model=schemas.UserOut)
async def register(user: schemas.UserCreate, db: AsyncSession = Depends(get_db)):
    db_user = await get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return await create_user(db=db, user=user)

@router.post("/login", response_model=dict)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    user = await get_user_by_username(db, username=form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "user_id": str(user.id)}



async def delete_user_service(db: AsyncSession, user_id: uuid.UUID):
    """Delete a user by their UUID."""
    db_user = await db.get(models.User, user_id)
    if db_user is None:
        return None
    await db.delete(db_user)
    await db.commit()
    return db_user



@router.get("/user/{user_id}", response_model=schemas.UserDisplay)
async def get_user_by_id(user_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    print(f"Fetching user with ID: {user_id}")  
    user = await db.get(models.User, user_id)
    if user is None:
        print("User not found")  
        raise HTTPException(status_code=404, detail="User not found")
    print("User found:", user.username)  
    return user


