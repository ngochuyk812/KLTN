from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controller.UserController import user_router
from controller.PredictController import predict_router
from controller.ProductController import product_router
from controller.OrderController import order_router
from database import database

app = FastAPI()

@app.on_event("startup")
async def startup():
    try:
        await database.connect()
        print("Database connected successfully.")
    except Exception as e:
        print(f"Database connection failed: {e}")

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
)

# Register routers
app.include_router(user_router, prefix="/users")
app.include_router(predict_router, prefix="/predict")
app.include_router(product_router, prefix="/product")
app.include_router(order_router, prefix="/orders", tags=["orders"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5000)
