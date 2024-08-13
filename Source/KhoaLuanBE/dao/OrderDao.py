from sqlalchemy import insert, select
from entity.OrderEntity import order_table
from entity.OrderDetailEntity import order_detail_table
from entity.ProductEntity import product_table
from database import database
from type.OrderType import OrderRequest, ExpandOrderDetailResponse
from type.ProductType import ProductOrderResponse
from .OrderDetailDao import createOrderDetail


async def getAllOrders():
    query = order_table.select()
    results = await database.fetch_all(query=query)
    return [dict(result) for result in results]


async def createOrder(order: OrderRequest):
    query = insert(order_table).values(
        customer_name=order.customer_name,
        address=order.address,
        phone_number=order.phone_number,
        email=order.email,
        order_date=order.order_date,
        total=order.total
    )
    await database.execute(query=query)
    last_id_query = "SELECT LAST_INSERT_ID()"
    order_id = await database.fetch_val(last_id_query)

    # Create order details and collect their responses
    order_details_response = []
    for detail in order.order_details:
        order_detail_response = await createOrderDetail(order_id, detail.product_id, detail.quantity)
        order_details_response.append(order_detail_response)

    order_response = {
        "id": order_id,
        "customer_name": order.customer_name,
        "address": order.address,
        "phone_number": order.phone_number,
        "email": order.email,
        "order_date": order.order_date,
        "total": order.total,
        "order_details": order_details_response
    }

    return order_response


async def getOrderDetail(order_id: int):
    query = select(
        order_detail_table.c.product_id,
        order_detail_table.c.quantity,
        product_table.c.label_id,
        product_table.c.image,
        product_table.c.price,
        product_table.c.product_name
    ).select_from(
        order_detail_table.join(product_table, order_detail_table.c.product_id == product_table.c.id)
    ).where(order_detail_table.c.order_id == order_id)

    result = await database.fetch_all(query=query)

    if not result:
        return None

    order_details = []
    for row in result:
        product = ProductOrderResponse(
            label_id=row.label_id,
            image=row.image,
            price=row.price,
            product_name=row.product_name
        )
        order_detail = ExpandOrderDetailResponse(
            product_id=row.product_id,
            quantity=row.quantity,
            product=product
        )
        order_details.append(order_detail)

    return order_details
