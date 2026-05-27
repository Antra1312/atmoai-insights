# backend application entrypoint 
from fastapi import FastAPI
from pydantic import BaseModel
from .inference import Predictor

app = FastAPI(title="AtmoAI Backend")

predictor = Predictor()

class PredictRequest(BaseModel):
    features: list[float]

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/predict")
async def predict(req: PredictRequest):
    """Return a single numeric PM2.5 prediction for the provided feature vector."""
    try:
        result = predictor.predict(req.features)
        return {"prediction": result}
    except Exception as e:
        return {"error": str(e)}
