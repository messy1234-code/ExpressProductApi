const express = require("express");
const app = express();

app.use(express.json());

// In-memory storage
let products = [];
let idCounter = 1;

/**
 * Create product
 */
app.post("/products", (req, res) => {
  const { name, price } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  const product = {
    id: idCounter++,
    name,
    price
  };

  products.push(product);
  res.status(201).json(product);
});

/**
 * Get all products
 */
app.get("/products", (req, res) => {
  res.json(products);
});

/**
 * Get product by ID
 */
app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

/**
 * Update product
 */
app.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;

  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (name) product.name = name;
  if (price !== undefined) product.price = price;

  res.json(product);
});

/**
 * Delete product
 */
app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products.splice(index, 1);
  res.json({ message: "Product deleted successfully" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
