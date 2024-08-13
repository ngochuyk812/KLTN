from fastapi import APIRouter, HTTPException
from typing import List
from service.ProductService import ProductService
from type.ProductType import ProductRequest, ProductResponse

product_router = APIRouter()
product_service = ProductService()

@product_router.get("/", response_model=List[ProductResponse])
async def get_products():
    products = await product_service.getProducts()
    return products

@product_router.post("/", response_model=ProductResponse)
async def create_product(product: ProductRequest):
    created_product = await product_service.createProduct(product)
    return created_product

@product_router.put("/{id}", response_model=ProductResponse)
async def update_product(id: int, product: ProductRequest):
    updated_product = await product_service.updateProductById(id, product)
    return updated_product

@product_router.delete("/{id}", response_model=bool)
async def delete_product(id: int):
    success = await product_service.delProductById(id)
    if not success:
        raise HTTPException(status_code=404, detail="Product not found")
    return success
