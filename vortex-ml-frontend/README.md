# VortexML Frontend

React client for the VortexML image classification demo.

![VortexML frontend overview](../docs/assets/vortexml-overview.png)

## Local Development

1. Start the backend so `http://localhost:8000/predict` is available.
2. Confirm `vortex-ml-frontend/.env` points to the backend:

```bash
REACT_APP_VORTEXML_API_ENDPOINT=http://localhost:8000/predict
```

3. Install dependencies and start the dev server:

```bash
npm install
npm start
```

4. Open `http://localhost:3000/VortexML`.

## Scripts

- `npm start`: run the local development server
- `npm test`: run the React test watcher
- `npm run build`: create a production build

## Notes

- The frontend currently exposes an AlexNet flow end to end.
- The `VGG-19` button is present in the UI, but it is not connected to a second backend model yet.
- See [the project README](../README.md) for the full walkthrough, screenshots, GIF, and API documentation.
