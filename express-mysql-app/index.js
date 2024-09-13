import express from "express";
import { createConnection } from "mysql2";

const app = express();
const port = 3000;

const db = createConnection({
  host: "localhost",
  user: "root",
  password: "REDACTED",
  database: "dummy_db",
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed: ", err);
  } else {
    console.log("Database connected successfully.");
  }
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, results) => {
    if (err) throw err;

    let html = `
      <h1>Products List</h1>
      <table border="1" cellpadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>`;

    results.forEach((product) => {
      html += `
        <tr>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.description}</td>
          <td>${product.created_at}</td>
        </tr>`;
    });

    html += `
        </tbody>
      </table>`;

    res.send(html);
  });
});

app.get("/addproduct", (req, res) => {
  const product = {
    name: "Product 1",
    price: 100,
    description: "This is product 1",
  };
  const sql = "INSERT INTO products SET ?";

  db.query(sql, product, (err, result) => {
    if (err) throw err;
    res.send("Product added successfully");
  });
});

app.get("/updateproduct/:id", (req, res) => {
  const newPrice = 150;
  const sql = `UPDATE products SET price = ${newPrice} WHERE id = ${req.params.id}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Product updated successfully");
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
