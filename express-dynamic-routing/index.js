import express from "express";
import path from "path";
const app = express();
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

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
          <a href="/">Go Back</a>
        </div>
      </body>
      </html>
    `);
  } else {
    res.status(404).send("Product not found");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
