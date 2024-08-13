from model.ProductModel import ProductModel
import base64
from io import BytesIO
from PIL import Image
import numpy as np
import os
from pathlib import Path
import tensorflow as tf 
from service.ModelInterfaceService import ModelInference
from dao.ProductDao import  get_products_by_label_id
def decode_base64_to_image(base64_string):
    try:
        # Xóa bỏ phần mở rộng (ví dụ: 'data:image/jpeg;base64,')
        base64_string = base64_string.split(",")[-1]
        # Thêm vào padding '=' nếu cần thiết
        missing_padding = len(base64_string) % 4
        if missing_padding != 0:
            base64_string += '=' * (4 - missing_padding)
        # Giải mã base64
        image_data = base64.b64decode(base64_string)
        # Đọc ảnh từ BytesIO
        image = Image.open(BytesIO(image_data))
        image = image.resize((64, 64))
        # Convert image to RGB if it has an alpha channel
        if image.mode == 'RGBA':
            image = image.convert('RGB')
        # Chuyển đổi thành mảng numpy và chuẩn hóa giá trị pixel
        image_array = np.array(image).astype('float32') / 255.0
        return image_array
    except Exception as e:
        print(f"Error decoding base64: {e}")
        return None
        

class PredictService:
    def __init__(self):
        self.test = "haha"
        self.model_inference = ModelInference()

    
    async def predict(self, image: str) -> ProductModel:
        image = decode_base64_to_image(image)
        label = self.model_inference.predict(image )
        print(label)
        product = await get_products_by_label_id(label)
        if not product:
            return None
        return ProductModel(**product)