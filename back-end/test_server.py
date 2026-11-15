"""Tests for the API's request handling. They do not need the model checkpoint.

server.py loads AlexNet_Param.pth at import time, and that file is not in the
repository. The fixture below replaces the checkpoint load, so the model keeps
its random initial weights. That is enough to test request validation, the
preprocessing path and CORS; it says nothing about prediction accuracy.

    pip install -r requirements.txt -r requirements-dev.txt
    pytest
"""

import importlib
import io
import sys

import pytest
import torch
from fastapi.testclient import TestClient
from PIL import Image


def load_server(monkeypatch, allowed_origins=None):
    """Import server.py fresh, without reading a checkpoint from disk."""
    monkeypatch.setattr(torch, "load", lambda *args, **kwargs: {})
    monkeypatch.setattr(torch.nn.Module, "load_state_dict", lambda self, state, *a, **k: None)
    if allowed_origins is None:
        monkeypatch.delenv("ALLOWED_ORIGINS", raising=False)
    else:
        monkeypatch.setenv("ALLOWED_ORIGINS", allowed_origins)
    sys.modules.pop("server", None)
    return importlib.import_module("server")


@pytest.fixture(scope="module")
def server():
    with pytest.MonkeyPatch.context() as monkeypatch:
        yield load_server(monkeypatch)
    sys.modules.pop("server", None)


@pytest.fixture(scope="module")
def client(server):
    return TestClient(server.app)


def png_bytes(mode="RGB", size=(40, 30)):
    buffer = io.BytesIO()
    Image.new(mode, size, color=128 if mode == "L" else (200, 30, 90)).save(buffer, format="PNG")
    return buffer.getvalue()


def test_predict_without_a_file_is_rejected(client):
    response = client.post("/predict")
    assert response.status_code == 422
    assert response.json()["detail"][0]["loc"] == ["body", "file"]


def test_predict_with_wrong_field_name_is_rejected(client):
    response = client.post("/predict", files={"image": ("cat.png", png_bytes(), "image/png")})
    assert response.status_code == 422


def test_predict_with_a_non_image_file_returns_400(client):
    response = client.post("/predict", files={"file": ("notes.txt", b"not an image", "text/plain")})
    assert response.status_code == 400
    assert "not a readable image" in response.json()["detail"]


def test_predict_with_an_empty_file_returns_400(client):
    response = client.post("/predict", files={"file": ("empty.png", b"", "image/png")})
    assert response.status_code == 400


def test_predict_with_a_valid_image_returns_a_cifar10_class_id(client):
    response = client.post("/predict", files={"file": ("cat.png", png_bytes(), "image/png")})
    assert response.status_code == 200
    class_id = response.json()["class_id"]
    assert isinstance(class_id, int)
    assert 0 <= class_id <= 9


def test_cors_allows_the_default_origins(client):
    for origin in ("https://sakshambedi.github.io", "http://localhost:3000"):
        response = client.options(
            "/predict",
            headers={"Origin": origin, "Access-Control-Request-Method": "POST"},
        )
        assert response.status_code == 200
        assert response.headers["access-control-allow-origin"] == origin


def test_cors_rejects_an_unlisted_origin(client):
    response = client.options(
        "/predict",
        headers={"Origin": "https://example.com", "Access-Control-Request-Method": "POST"},
    )
    assert response.status_code == 400
    assert "access-control-allow-origin" not in response.headers


def test_allowed_origins_default_when_variable_is_unset_or_blank(server, monkeypatch):
    monkeypatch.delenv("ALLOWED_ORIGINS", raising=False)
    assert server.get_allowed_origins() == server.DEFAULT_ALLOWED_ORIGINS
    monkeypatch.setenv("ALLOWED_ORIGINS", " , ")
    assert server.get_allowed_origins() == server.DEFAULT_ALLOWED_ORIGINS


def test_allowed_origins_are_read_from_the_environment(server, monkeypatch):
    monkeypatch.setenv("ALLOWED_ORIGINS", "https://a.example, https://b.example/ ,")
    assert server.get_allowed_origins() == ["https://a.example", "https://b.example"]


def test_cors_uses_origins_from_the_environment_at_startup(monkeypatch):
    custom = load_server(monkeypatch, allowed_origins="https://demo.example")
    try:
        custom_client = TestClient(custom.app)
        preflight = {"Access-Control-Request-Method": "POST"}
        allowed = custom_client.options("/predict", headers={"Origin": "https://demo.example", **preflight})
        assert allowed.headers["access-control-allow-origin"] == "https://demo.example"
        default = custom_client.options(
            "/predict", headers={"Origin": "https://sakshambedi.github.io", **preflight}
        )
        assert "access-control-allow-origin" not in default.headers
    finally:
        sys.modules.pop("server", None)
