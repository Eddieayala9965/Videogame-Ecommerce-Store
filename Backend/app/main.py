from fastapi import FastAPI
from app.api.endpoints import game  # Import your routes

# Create an instance of FastAPI
app = FastAPI()

# Include the router from your games endpoint
app.include_router(game.router, prefix="/api/v1", tags=["games"])

# Root path to verify the API is working
@app.get("/")
async def root():
    return {"message": "Welcome to the Video Game API!"}
