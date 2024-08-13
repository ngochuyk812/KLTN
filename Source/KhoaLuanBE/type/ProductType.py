# type/ProductType.py
from pydantic import BaseModel


class ProductRequest(BaseModel):
    image: str
    price: int
    product_name: str

    def to_dict(self):
        return self.dict()


class ProductResponse(BaseModel):
    id: int
    label_id: int
    image: str
    price: int
    product_name: str
class ProductOrderResponse(BaseModel):
    label_id: int
    image: str
    price: int
    product_name: str

