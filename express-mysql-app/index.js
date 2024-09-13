import express from "express";
import { Sequelize, DataTypes } from "sequelize";

const app = express();
const port = 3000;

const sequelize = new Sequelize("dummy_db", "root", "REDACTED", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected with Sequelize"))
  .catch((err) => console.log("Error: " + err));

const Product = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
  }
);

sequelize.sync();

app.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    let html = `
      <h1>Products List</h1>
      <table border="1" cellpadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>`;

    products.forEach((product) => {
      html += `
        <tr>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.description}</td>
        </tr>`;
    });

    html += `
        </tbody>
      </table>`;
    res.send(html);
  } catch (err) {
    console.error("Error fetching products: ", err);
    res.status(500).send("Error fetching products");
  }
});

app.get("/addproduct", async (req, res) => {
  try {
    const product = await Product.create({
      name: "Product 1",
      price: 100,
      description: "This is product 1",
    });
    res.send("Product added successfully");
  } catch (err) {
    res.send("Error adding product");
  }
});

app.get("/updateproduct/:id", async (req, res) => {
  try {
    const product = await Product.update(
      { price: 150 },
      { where: { id: req.params.id } }
    );
    res.send("Product updated successfully");
  } catch (err) {
    res.send("Error updating product");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
