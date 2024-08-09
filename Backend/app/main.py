from fastapi import FastAPI
from .api.endpoints import auth

app = FastAPI()

app.include_router(auth.router, prefix="/auth")

@app.get("/")
async def root():
    return {"message": "Welcome to the Video Game E-Commerce Store API"}
