from fastapi import APIRouter, HTTPException
from typing import List
from service.UserService import UserService
from type.UserType import CreateUser, User

user_router = APIRouter()
user_service = UserService()

@user_router.get("/", response_model=List[User])
def get_users():
    return user_service.get_all_users()

@user_router.get("/{user_id}", response_model=User)
def get_user(user_id: int):
    user = user_service.get_user_by_id(user_id)
    if user:
        return user
    raise HTTPException(status_code=404, detail="User not found")

@user_router.post("/", response_model=User)
def create_user(user: CreateUser):
    return user_service.create_user(user)

@user_router.put("/{user_id}", response_model=User)
def update_user(user_id: int, user: CreateUser):
    updated_user = user_service.update_user(user_id, user)
    if updated_user:
        return updated_user
    raise HTTPException(status_code=404, detail="User not found")

@user_router.delete("/{user_id}")
def delete_user(user_id: int):
    success = user_service.delete_user(user_id)
    if success:
        return {"message": "User deleted"}
    raise HTTPException(status_code=404, detail="User not found")
