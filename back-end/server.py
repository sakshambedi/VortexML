from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from torchvision.transforms import v2
from PIL import Image
import torch
import io
import torch.nn as nn

app =FastAPI()
# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)


class AlexNet(nn.Module):
    def __init__(self, num_classes=10, dropout=0.5):
        super(AlexNet, self).__init__()
        self.layers = nn.Sequential(
            nn.Conv2d(
                in_channels=3, out_channels=64, kernel_size=3, stride=1, padding=1
            ),  # output: 64*64*64
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2),  # output: 32*32*64
            nn.Conv2d(
                in_channels=64, out_channels=192, kernel_size=3, stride=1, padding=1
            ),  # output: 32*32*192
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2),  # output: 16*16*192
            nn.Conv2d(
                in_channels=192, out_channels=384, kernel_size=3, stride=1, padding=1
            ),  # output: 16*16*384
            nn.ReLU(inplace=True),
            nn.Conv2d(
                in_channels=384,
                out_channels=256,
                kernel_size=3,
                stride=1,
                padding=1,
            ),  # output: 16*16*256
            nn.ReLU(inplace=True),
            nn.Conv2d(
                in_channels=256, out_channels=256, kernel_size=3, stride=1, padding=1
            ),  # output: 16*16*256
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2),  # output: 8*8*256
        )

        self.classifier = nn.Sequential(
            nn.Dropout(p=dropout),
            nn.Linear(in_features=256 * 8 * 8, out_features=4096),
            nn.ReLU(inplace=True),
            nn.Dropout(p=dropout),
            nn.Linear(in_features=4096, out_features=4096),
            nn.ReLU(inplace=True),
            nn.Dropout(p=dropout),
            nn.Linear(in_features=4096, out_features=num_classes),
        )

    def forward(self, x):
        x = self.layers(x)
        x = x.view(x.size(0), 256 * 8 * 8)
        logits = self.classifier(x)
        return logits

# Load the model
model = AlexNet(num_classes=10)
model.load_state_dict(
    torch.load("AlexNet_Param.pth", map_location=torch.device("cpu"))
)
model.eval()


mean, std = (0.4914, 0.4822, 0.4465), (0.2470, 0.2435, 0.2616)

transformer = v2.Compose(
    [
        v2.Resize((70, 70)),
        v2.CenterCrop((64, 64)),
        v2.ToImage(),
        v2.ToDtype(torch.float32, scale=True),
        v2.Normalize(mean, std),
    ]
)


def transform_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes))
    return transformer(image).unsqueeze(0)

def get_prediction(image_bytes):
    tensor = transform_image(image_bytes=image_bytes)
    outputs = model(tensor)
    _, predicted = torch.max(outputs.data, 1)
    return predicted.item()

@app.get("/")
def api_root():
    print("Welcome to the API!")


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    img_bytes = await file.read()
    class_id = get_prediction(img_bytes)
    return JSONResponse(content={"class_id": class_id})

