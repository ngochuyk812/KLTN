from type.ProductType import ProductResponse
import base64
from io import BytesIO
from PIL import Image
import numpy as np
from service.ModelInterfaceService import ModelInference
from dao.ProductDao import  get_products_by_label_id

def has_significant_pixel_changes(image, threshold=50, sample_rate=5):
    image = np.array(image)
    if image.ndim == 3:
        image = np.mean(image, axis=2).astype(np.uint8) 

    for i in range(0, image.shape[0] - 1, sample_rate):
        for j in range(0, image.shape[1] - 1, sample_rate):
            if abs(int(image[i, j]) - int(image[i + 1, j])) >= threshold or \
               abs(int(image[i, j]) - int(image[i, j + 1])) >= threshold:
                return True
    return False

def decode_base64_to_image(base64_string):
    try:
        base64_string = base64_string.split(",")[-1]
        missing_padding = len(base64_string) % 4
        if missing_padding != 0:
            base64_string += '=' * (4 - missing_padding)
        image_data = base64.b64decode(base64_string)
        image = Image.open(BytesIO(image_data))
        image = image.resize((64, 64))
       
        if image.mode == 'RGBA':
            image = image.convert('RGB')

        if(has_significant_pixel_changes(image) == False):
            return None
        image_array = np.array(image).astype('float32') / 255.0
        return image_array
    except Exception as e:
        print(f"Error decoding base64: {e}")
        return None

class PredictService:
    def __init__(self):
        self.test = "haha"
        self.model_inference = ModelInference()

    
    async def predict(self, image: str) -> ProductResponse:
        image = decode_base64_to_image(image)
        if image is None or image.size == 0:
            return None
        label = self.model_inference.predict(image )
        print(label)
        product = await get_products_by_label_id(label)
        if not product:
            return None
        return ProductResponse(**product)