from fastapi import APIRouter, HTTPException
from typing import List
from dao.OrderDao import getAllOrders, createOrder, getOrderDetail
from type.OrderType import OrderRequest, OrderResponse, ExpandOrderDetailResponse

order_router = APIRouter()

@order_router.get("/", response_model=List[OrderResponse])
async def get_orders():
    orders = await getAllOrders()
    return orders

@order_router.post("/", response_model=OrderResponse)
async def create_order(order: OrderRequest):
    created_order = await createOrder(order)
    return created_order

@order_router.get("/order-detail/{id}", response_model=List[ExpandOrderDetailResponse])
async def get_order_detail(id: int):
    print("id_aaa",id)
    order_details = await getOrderDetail(id)
    if not order_details:
        raise HTTPException(status_code=404, detail="Order not found")
    return order_details
