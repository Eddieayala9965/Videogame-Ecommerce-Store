from fastapi import FastAPI
from app.api.endpoints import game  

app = FastAPI()

app.include_router(game.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Video Game API!"}

