# mcp-demo-products

Minimal Express 5 CRUD API for experimenting with Model Context Protocol integrations. Data is stored in-memory for simplicity, so each server restart resets the dataset.

## Setup

1. Install [Node.js](https://nodejs.org/) 18+ (the project is tested with the Active LTS release).
2. Clone the repository and move into the folder.
3. Install dependencies:
	 ```bash
	 npm install
	 ```

## Run commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the API with `nodemon` for live reload during development (defaults to `http://localhost:3000`). |
| `npm start` | Starts the API once in production mode. Set `PORT` to override the default `3000`. |

Example:

```bash
PORT=4000 npm start
# API listening on http://localhost:4000
```

## Endpoints

Base URL: `http://localhost:3000`

| Method | Path | Description | Notes |
| --- | --- | --- | --- |
| GET | `/health` | Lightweight liveness probe | Returns `{ "status": "ok" }`. |
| GET | `/products` | List all products | Returns an array. |
| GET | `/products/:id` | Retrieve a single product | Returns `404` if the id does not exist. |
| POST | `/products` | Create a product | Body requires `name` (string, ≥ 2 chars) and `price` (number > 0). Optional fields (e.g., `tags`) are persisted as provided. Returns `201` with the created record. |
| PUT | `/products/:id` | Update an existing product | Full-object update with the same validation rules as `POST`. Returns `404` if the product does not exist. |
| DELETE | `/products/:id` | Remove a product | Returns `204` on success or `404` if the product does not exist. |

Sample create request:

```bash
curl -X POST http://localhost:3000/products \
	-H "Content-Type: application/json" \
	-d '{"name":"Test Product","price":99.99,"tags":["electronics"]}'
```

Typical success response:

```json
{
	"id": "1",
	"name": "Test Product",
	"price": 99.99,
	"tags": ["electronics"]
}
```

Validation failures respond with HTTP `400` and a payload shaped like:

```json
{
	"error": "Validation failed",
	"details": ["name must be a string with at least 2 characters"]
}
```

## Testing

Run the entire Jest suite (unit + integration):

```bash
npm test
```

The tests boot the Express app in-memory via SuperTest—no server process needs to be running. Use `npm run dev` in another terminal if you want to click-test endpoints while the suite runs.