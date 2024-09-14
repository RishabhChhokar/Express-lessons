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


const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


const Product = sequelize.define("Product", {
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
});


User.hasMany(Product, { foreignKey: "userId" });
Product.belongsTo(User, { foreignKey: "userId" });


sequelize
  .sync({ force: true })
  .then(() => console.log("Tables synced successfully"))
  .catch((err) => console.log("Error syncing tables: " + err));


app.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({ include: User });
    let html = `
      <h1>Products List</h1>
      <table border="1" cellpadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>User</th>
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
          <td>${product.User.name}</td>
        </tr>`;
    });

    html += `
        </tbody>
      </table>`;
    res.send(html);
  } catch (err) {
    res.send("Error fetching products");
  }
});


app.get("/adduserandproduct", async (req, res) => {
  try {
    const user = await User.create({
      name: "Rishabh",
      email: "Rishabh@yahoo.com",
    });

    const product = await Product.create({
      name: "watch",
      price: 100,
      description: "This is a titan watch",
      userId: user.id,
    });

    res.send("User and Product added successfully");
  } catch (err) {
    res.send("Error adding user and product");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
