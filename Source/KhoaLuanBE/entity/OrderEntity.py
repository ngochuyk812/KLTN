from sqlalchemy import Table, Column, Integer, String, MetaData, DateTime

metadata = MetaData()

order_table = Table(
    "order",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("customer_name", String(255)),
    Column("address", String(255)),
    Column("phone_number", String(20)),
    Column("email", String(255)),
    Column("order_date", DateTime),
    Column("total", Integer)
)
