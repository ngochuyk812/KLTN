class ProductModel:
    def __init__(self, image, price, label_id, product_name,id=None):
        self.id = id
        self.label_id = label_id
        self.image = image
        self.price = price
        self.product_name = product_name
    def to_dict(self):
        return {
            'id': self.id,
            'label_id': self.label_id,
            'image': self.image,
            'price': self.price,
            'product_name': self.product_name
        }
