import os
import pickle
import numpy as np
from .model import load_model

ARTIFACT_DIR = os.path.join(os.path.dirname(__file__), "artifacts")
MODEL_PATH = os.path.join(ARTIFACT_DIR, "pm25_forecasting_model.pth")
NORM_PATH = os.path.join(ARTIFACT_DIR, "normalization.pkl")

class Predictor:
    def __init__(self):
        # load normalization params if available
        self.norm = None
        try:
            with open(NORM_PATH, 'rb') as f:
                self.norm = pickle.load(f)
        except Exception:
            self.norm = None

        # load model
        self.model = load_model(MODEL_PATH)

    def predict(self, features: list[float]):
        arr = np.array(features, dtype=float)
        if self.norm and hasattr(self.norm, 'transform'):
            try:
                arr = self.norm.transform([arr])[0]
            except Exception:
                pass
        # pad/truncate to model input length 10
        if arr.size < 10:
            arr = np.pad(arr, (0, 10 - arr.size), constant_values=0)
        else:
            arr = arr[:10]

        # run through model
        try:
            import torch
            x = torch.tensor(arr, dtype=torch.float32).unsqueeze(0)
            y = self.model(x).detach().cpu().numpy().flatten()[0]
            return float(y)
        except Exception as e:
            # fallback: simple mean heuristic
            return float(arr.mean())
