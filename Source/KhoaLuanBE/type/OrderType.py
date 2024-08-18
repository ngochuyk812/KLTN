from pydantic import BaseModel
from datetime import datetime
from typing import List
from type.ProductType import ProductOrderResponse

class OrderDetailRequest(BaseModel):
    product_id: int
    quantity: int
    image: str
    price: int
    product_name: str

class OrderRequest(BaseModel):
    customer_name: str
    address: str
    phone_number: str
    email: str
    order_date: datetime
    total: int
    order_details: List[OrderDetailRequest]

class OrderDetailResponse(BaseModel):
    id: int
    product_id: int
    quantity: int

class OrderResponse(BaseModel):
    id: int
    customer_name: str
    address: str
    phone_number: str
    email: str
    order_date: datetime  # Expecting a datetime object
    total: int


class ExpandOrderDetailResponse(BaseModel):
    product_id: int
    quantity: int
    product: ProductOrderResponse
class ExpandOrderResponse(BaseModel):
    id: int
    customer_name: str
    address: str
    phone_number: str
    email: str
    order_date: datetime
    total: int
    order_details: List[OrderDetailRequest]