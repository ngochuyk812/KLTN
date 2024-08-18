from typing import List
from dao.ProductDao import getAllProduct, createProduct, updateProductById, delProductById, get_products_by_label_id
from type.ProductType import ProductResponse, ProductRequest

class ProductService:
    async def getProducts(self) -> List[ProductResponse]:
        products = await getAllProduct()
        return [ProductResponse(**product) for product in products]
    async def createProduct(self, product: ProductRequest) -> ProductResponse:
        created_product = await createProduct(product)
        return ProductResponse(**created_product)

    async def updateProductById(self, id: int, product: ProductRequest) -> ProductResponse:
        updated_product = await updateProductById(id, product.to_dict())
        print("updated_product",updated_product)
        return ProductResponse(**updated_product)

    async def delProductById(self, id: int) -> bool:
        return await delProductById(id)

