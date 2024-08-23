from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import auth, game, order, products, review, user
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
app.include_router(order.router, prefix="/orders", tags={"orders"})
app.include_router(products.router, prefix="/products", tags=["products"])
app.include_router(review.router, prefix="/reviews", tags=["reviews"])
app.include_router(user.router, prefix="/users", tags=["users"])

@app.get("/")
async def root():
    return {"message": "Welcome to the Video Game E-Commerce Store!"}


