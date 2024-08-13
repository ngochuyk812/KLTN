from sqlalchemy import insert
from entity.OrderDetailEntity import order_detail_table
from database import database

async def createOrderDetail(order_id: int, product_id: int, quantity: int):
    query = insert(order_detail_table).values(
        order_id=order_id,
        product_id=product_id,
        quantity=quantity
    )
    await database.execute(query=query)

    # Retrieve the last inserted id
    last_id_query = "SELECT LAST_INSERT_ID()"
    order_detail_id = await database.fetch_val(last_id_query)
    return {
        "id": order_detail_id,
        "product_id": product_id,
        "quantity": quantity
    }
