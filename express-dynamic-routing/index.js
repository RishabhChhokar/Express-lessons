import express from "express";
import path from "path";
const app = express();
import { addToCart, getOrCreateCart } from "./model/cart.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  req.userId = 1;
  next()
});

const products = [
  {
    id: 1,
    name: "Dell Laptop",
    price: 1200,
    description: "A high-performance dell laptop.",
  },
  { id: 2, name: "Phone", price: 800, description: "Iphone 10x pro." },
  {
    id: 3,
    name: "Boss Headphones",
    price: 150,
    description: "Noise-cancelling boss headphones.",
  },
];

app.get("/", (req, res) => {

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>A shopping website</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div class="container">
          <h1>Welcome to shopping cart</h1>  
          <a href="/cart">look at your cart</a>
        </div>
      </body>
      </html>
    `);
  }
);

app.get("/product/:id", (req, res) => {
  const productId = req.params.id;
  const product = products.find((p) => p.id == productId);

  if (product) {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${product.name}</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div class="container">
          <h1>${product.name}</h1>
          <p><strong>Price:</strong> $${product.price}</p>
          <p><strong>Description:</strong> ${product.description}</p>
          <form action="/cart/add/${product.id}" method="POST">
            <button type="submit">Add to Cart</button>
          </form>
          <a href="/">Go Back</a>
        </div>
      </body>
      </html>
    `);
  } else {
    res.status(404).send("Product not found");
  }
});

app.post("/cart/add/:id", (req, res) => {
  const productId = req.params.id;
  const product = products.find((p) => p.id == productId);

  if (product) {
    addToCart(req.userId, product);
    res.redirect(`/cart`);
  } else {
    res.status(404).send("Product not found");
  }
});

app.get("/cart", (req, res) => {
  const cart = getOrCreateCart(req.userId);
  const cartHtml = cart.items
    .map(
      (item) => `
    <div>
      <p>${item.product.name} - $${item.product.price} (Quantity: ${item.quantity})</p>
    </div>
  `
    )
    .join("");

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Cart</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <div class="container">
        <h1>Your Cart</h1>
        ${cartHtml || "<p>Your cart is empty</p>"}
        <a href="/">Continue Shopping</a>
      </div>
    </body>
    </html>
  `);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
