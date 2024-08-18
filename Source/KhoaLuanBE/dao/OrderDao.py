from sqlalchemy import insert, select
from entity.OrderEntity import order_table
from entity.OrderDetailEntity import order_detail_table
from entity.ProductEntity import product_table
from database import database
from type.OrderType import OrderRequest, ExpandOrderDetailResponse
from type.ProductType import ProductOrderResponse
from .OrderDetailDao import createOrderDetail
from datetime import datetime, date
from type.OrderType import OrderResponse,ExpandOrderResponse


async def getAllOrders():
    query = select(order_table).order_by(order_table.c.order_date.desc())
    results = await database.fetch_all(query=query)

    orders = []
    for result in results:
        order_dict = dict(result)

        # Convert order_date to datetime if it's a datetime.date
        if isinstance(order_dict['order_date'], date):
            order_dict['order_date'] = datetime.combine(order_dict['order_date'], datetime.min.time())

        orders.append(order_dict)

    return orders


async def createOrder(
        order: OrderRequest) -> OrderResponse:  # Change to OrderResponse if that's the intended return type
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

    order_details_response = []
    for detail in order.order_details:
        order_detail_response = await createOrderDetail(order_id, detail.product_id, detail.quantity,detail.product_name,detail.image,detail.price)
        order_details_response.append(order_detail_response)

    order_response = ExpandOrderResponse(
        id=order_id,
        customer_name=order.customer_name,
        address=order.address,
        phone_number=order.phone_number,
        email=order.email,
        order_date=order.order_date,
        total=order.total,
        order_details=order_details_response
    )

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
