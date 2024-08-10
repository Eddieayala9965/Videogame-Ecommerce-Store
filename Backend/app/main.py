from fastapi import FastAPI
from app.api.endpoints import game  # Ensure this import matches your project structure

app = FastAPI()

# Register the games router
app.include_router(game.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Video Game API!"}

