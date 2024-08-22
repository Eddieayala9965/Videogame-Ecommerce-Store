from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import auth, game, orders, products, reviews, users
from app.db import create_database

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware, 
    origins=origins,
    credentials=True,
    methods=["*"],
    headers=["*"]
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(game.router, prefix="/games", tags=["games"])
app.include_router(orders.router, prefix="/orders", tags={"orders"})
app.include_router(products.router, prefix="/products", tags=["products"])
app.include_router(reviews.router, prefix="/reviews", tags=["reviews"])
app.include_router(users.router, prefix="/users", tags=["users"])

@app.get("/")
async def root():
    return {"message": "Welcome to the Video Game E-Commerce Store!"}


