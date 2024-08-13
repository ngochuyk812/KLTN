from pydantic import BaseModel
class PredictRequest(BaseModel):
    imageBase64: str