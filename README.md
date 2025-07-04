# VortexML - Deep Learning Image Classification Platform

A full-stack web application for image classification using custom-trained convolutional neural networks. Built with React frontend, FastAPI backend, and PyTorch for deep learning inference.

## 🚀 Live Demo

- **Frontend**: [https://sakshambedi.github.io/VortexML](https://sakshambedi.github.io/VortexML)
- **API Documentation**: Available when running the backend locally

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Model Information](#model-information)
- [Docker Deployment](#docker-deployment)
- [Contributing](#contributing)

## 🎯 Overview

VortexML is a comprehensive machine learning platform that demonstrates the end-to-end deployment of deep learning models for image classification. The project showcases a production-ready implementation of AlexNet trained on the CIFAR-10 dataset, featuring a modern React frontend and robust FastAPI backend with Docker containerization.

### Key Achievements

- **Custom AlexNet Implementation**: Built from scratch using PyTorch with 60M parameters
- **Production-Ready Deployment**: Containerized with Docker for scalable deployment
- **Modern Web Interface**: Responsive React frontend with intuitive model selection
- **RESTful API**: FastAPI backend with automatic OpenAPI documentation
- **Cross-Platform Compatibility**: Supports multiple deployment environments

## ✨ Features

### 🖼️ Image Classification

- Upload images for real-time classification
- Support for 10 CIFAR-10 classes: Airplane, Automobile, Bird, Cat, Deer, Dog, Frog, Horse, Ship, Truck
- Preprocessing pipeline with normalization and resizing

### 🔧 Technical Features

- **Real-time Inference**: Fast model predictions with PyTorch
- **CORS Enabled**: Cross-origin resource sharing for web deployment
- **Error Handling**: Comprehensive error handling and validation
- **Containerized Deployment**: Docker support for easy deployment
- **API Documentation**: Auto-generated OpenAPI/Swagger documentation

### 🎨 User Interface

- Clean, modern React interface
- Model selection component
- Drag-and-drop image upload
- Real-time prediction results
- Responsive design for mobile and desktop

## 🛠️ Tech Stack

### Frontend

- **React 18.3.1**: Modern JavaScript framework
- **CSS3**: Custom styling with responsive design
- **GitHub Pages**: Static site hosting

### Backend

- **FastAPI**: Modern, fast Python web framework
- **PyTorch**: Deep learning framework for model inference
- **Uvicorn**: ASGI server for production deployment
- **Pillow**: Image processing library

### DevOps & Deployment

- **Docker**: Containerization platform
- **GitHub Actions**: CI/CD pipeline
- **GitHub Pages**: Frontend deployment

### Development Tools

- **Python 3.12**: Backend runtime
- **Node.js**: Frontend build tools
- **npm**: Package management

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ React Frontend  │    │ FastAPI Backend │    │  PyTorch Model  │
│                 │    │                 │    │                 │
│  - Image Upload │────│  - REST API     │────│  - AlexNet CNN  │
│  - UI Components│    │  - CORS Handling│    │  - CIFAR-10     │
│  - State Mgmt   │    │  - Validation   │    │  - Inference    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        │
         │                        │                        │
    ┌─────────┐              ┌─────────┐              ┌─────────┐
    │ GitHub  │              │ Docker  │              │ Model   │
    │ Pages   │              │Container│              │ Weights │
    └─────────┘              └─────────┘              └─────────┘
```

## 🚀 Installation

### Prerequisites

- Python 3.12+
- Node.js 16+
- Docker (optional, for containerized deployment)

### Backend Setup

```bash
cd back-end
pip install -r requirements.txt
```

### Frontend Setup

```bash
cd vortex-ml-frontend
npm install
```

### Model Files

Ensure `AlexNet_Param.pth` is placed in the `back-end/` directory.

## 💻 Usage

### Running Locally

#### Backend

```bash
cd back-end
uvicorn server:app --host 0.0.0.0 --port 8000 --reload
```

#### Frontend

```bash
cd vortex-ml-frontend
npm start
```

### API Testing

```bash
# Test prediction endpoint
curl -X POST "http://localhost:8000/predict" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@your_image.jpg"
```

## 📖 API Documentation

### Endpoints

#### `POST /predict`

Upload an image for classification.

**Parameters:**

- `file`: Image file (multipart/form-data)

**Response:**

```json
{
  "class_id": 3
}
```

**Class Mapping:**

- 0: Airplane
- 1: Automobile
- 2: Bird
- 3: Cat
- 4: Deer
- 5: Dog
- 6: Frog
- 7: Horse
- 8: Ship
- 9: Truck

#### `GET /`

Health check endpoint.

### Interactive Documentation

When running locally, visit `http://localhost:8000/docs` for interactive API documentation.

## 🧠 Model Information

### AlexNet Architecture

- **Input Size**: 64×64×3 (RGB images)
- **Parameters**: ~60 million
- **Layers**: 5 convolutional + 3 fully connected
- **Activation**: ReLU
- **Regularization**: Dropout (0.5)

### Training Details

- **Dataset**: CIFAR-10 (60,000 32×32 color images)
- **Classes**: 10 categories
- **Preprocessing**: Resize to 70×70, center crop to 64×64, normalization
- **Framework**: PyTorch

### Performance

- Trained on CIFAR-10 dataset
- Real-time inference capability
- CPU-optimized for deployment

## 🐳 Docker Deployment

### Build Image

```bash
cd back-end
docker build -t vortexml-backend .
```

### Run Container

```bash
docker run --name vortexml-api -p 8000:8000 vortexml-backend
```

### Expected Output

```
INFO: Uvicorn running on http://0.0.0.0:8000
```

### Testing Docker Deployment

- Web Interface: `http://localhost:8000/docs`
- API Testing: Use curl commands as shown above

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Live Demo**: [https://sakshambedi.github.io/VortexML](https://sakshambedi.github.io/VortexML)
- **GitHub Repository**: [https://github.com/sakshambedi/VortexML](https://github.com/sakshambedi/VortexML)

## 👨‍💻 Author

**Saksham Bedi**

- GitHub: [@sakshambedi](https://github.com/sakshambedi)
- Email: [Your Email]

---

_Built with ❤️ using React, FastAPI, and PyTorch_
