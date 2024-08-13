from sqlalchemy import insert, update, select
from entity.ProductEntity import product_table
from database import database
from type.ProductType import ProductRequest


async def getAllProduct():
    query = product_table.select()
    results = await database.fetch_all(query=query)
    return [dict(result) for result in results]


async def delProductById(id) -> bool:
    query = product_table.delete().where(product_table.c.id == id)
    number_row = await database.execute(query=query)
    return number_row > 0


async def createProduct(product: ProductRequest):
    query = insert(product_table).values(
        image=product.image,
        price=product.price,
        product_name=product.product_name
    )
    # Execute the insert query
    await database.execute(query=query)

    # Retrieve the last inserted id
    last_id_query = "SELECT LAST_INSERT_ID()"
    product_id = await database.fetch_val(last_id_query)
    return {
        "id": product_id,
        "image": product.image,
        "price": product.price,
        "product_name": product.product_name
    }


async def updateProductById(id, new_data):
    query = (
        update(product_table)
        .where(product_table.c.id == id)
        .values(new_data)
    )
    await database.execute(query=query)
    query = select(product_table).where(product_table.c.id == id)
    updated_product = await database.fetch_one(query=query)
    return dict(updated_product)


async def get_products_by_label_id(label_id):
    print(label_id)
    query = select(product_table).where(product_table.c.label_id == label_id)
    result = await database.fetch_one(query=query)
    print(result)
    if not result:
        return None
    return dict(result)