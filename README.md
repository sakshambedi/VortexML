# Readme For Deployment

## Components for the website

1. Frontend
2. Backend
3. Model
4. Other Components that I haven't thought about

### Frontend

The frontend will be done using HTML, CSS, JS, React (because it is easy to learn).

### Backend

Use Flask for backend.

### Model

The model are trained and are the main component to make this work. I dont know how all of this will be compiled, hosted and deployed.

Thats the plan for now :)

## Docker Readme

This is the readme part for the docker.

1. Building docker image :
   ` $ docker build -t image_name`
2. Running container :
   `$ docker run --name container_name -p 8000:8000 image_name`
3. Output will look like :

```
INFO: Uvicorn running on http://0.0.0.0:8080
- use this url in chrone to see the model frontend.
- user this for testing the model.
```

4. Query Model

   4.1 Via web interface (chrome): http://0.0.0.0:8008/docs $\rightarrow$ test model

   4.2 Via python client: client-py

   4.3 Via curl request
   `$ curl -X POST "http://0.0.0.0:8000/predict" -H "accept: application/json" -H "Content-Type: application/json" -d '{"features": [5.1, 3.5, 1.4, 0.2]}'`
