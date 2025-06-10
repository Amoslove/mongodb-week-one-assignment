const express = require("express");
const router = express.Router();
const products = require("../data/products");
const auth = require("../middleware/auth");
const validateProduct = require("../middleware/validateProduct");
const { NotFoundError } = require("../utils/customErrors");

// GET all products
router.get("/", (req, res) => {
  let filtered = products;

  if (req.query.category) {
    filtered = filtered.filter((p) => p.category === req.query.category);
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || filtered.length;
  const start = (page - 1) * limit;

  res.json(filtered.slice(start, start + limit));
});

// GET product by ID
router.get("/:id", (req, res, next) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return next(new NotFoundError("Product not found"));
  res.json(product);
});

// POST new product
router.post("/", auth, validateProduct, (req, res) => {
  const newProduct = { id: require("uuid").v4(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product
router.put("/:id", auth, validateProduct, (req, res, next) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError("Product not found"));

  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// DELETE product
router.delete("/:id", auth, (req, res, next) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError("Product not found"));

  const deleted = products.splice(index, 1);
  res.json(deleted[0]);
});

// Search by name
router.get("/search/:name", (req, res) => {
  const result = products.filter((p) =>
    p.name.toLowerCase().includes(req.params.name.toLowerCase())
  );
  res.json(result);
});

// Statistics
router.get("/stats", (req, res) => {
  const stats = {};
  products.forEach((p) => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json(stats);
});

module.exports = router;
