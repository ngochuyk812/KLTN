from model.UserModel import UserModel
from typing import List, Optional
from pydantic import BaseModel

class CreateUser(BaseModel):
    name: str
    email: str

class UserService:
    def __init__(self):
        self.users = [
            UserModel(id=1, name="John Doe", email="john.doe@example.com"),
            UserModel(id=2, name="Jane Smith", email="jane.smith@example.com"),
            UserModel(id=3, name="Alice Johnson", email="alice.johnson@example.com")
        ]
    def get_all_users(self) -> List[UserModel]:
        return self.users

    def get_user_by_id(self, user_id: int) -> Optional[UserModel]:
        user = next((user for user in self.users if user.id == user_id), None)
        return user

    def create_user(self, data: CreateUser) -> UserModel:
        new_user = UserModel(id=len(self.users) + 1, name=data.name, email=data.email)
        self.users.append(new_user)
        return new_user

    def update_user(self, user_id: int, data: CreateUser) -> Optional[UserModel]:
        user = next((user for user in self.users if user.id == user_id), None)
        if user:
            user.name = data.name
            user.email = data.email
            return user
        return None

    def delete_user(self, user_id: int) -> bool:
        user = next((user for user in self.users if user.id == user_id), None)
        if user:
            self.users.remove(user)
            return True
        return False
        
