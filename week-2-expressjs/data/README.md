# Express.js Product API

## Setup
1. Clone the repo
2. Run npm install
3. Create a .env file from .env.example
4. Start the server: node server.js

## API Endpoints

### GET /api/products
- List all products
- Query params: category, page, limit

### GET /api/products/:id
- Get product by ID

### POST /api/products
- Create new product *(requires x-api-key header)*

### PUT /api/products/:id
- Update product *(requires x-api-key header)*

### DELETE /api/products/:id
- Delete product *(requires x-api-key header)*

### GET /api/products/search/:name
- Search by name

### GET /api/products/stats
- Product count by category