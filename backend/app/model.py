import torch

class DummyModel(torch.nn.Module):
    def __init__(self):
        super().__init__()
        self.linear = torch.nn.Linear(10, 1)

    def forward(self, x):
        return self.linear(x)


def load_model(path: str):
    # In real usage, load a trained model
    model = DummyModel()
    try:
        model.load_state_dict(torch.load(path))
    except Exception:
        # ignore if file missing; return initialized model
        pass
    model.eval()
    return model
