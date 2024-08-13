from sqlalchemy import Table, Column, Integer, ForeignKey, MetaData

metadata = MetaData()

order_detail_table = Table(
    "order_detail",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("order_id", Integer, ForeignKey("order.id")),
    Column("product_id", Integer),
    Column("quantity", Integer)
)
