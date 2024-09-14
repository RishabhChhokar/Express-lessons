import express from "express";
import { Sequelize, DataTypes } from "sequelize";

const app = express();
const port = 3000;

app.use(express.json());

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

const CartItem = sequelize.define("CartItem", {
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
});

User.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(User, { through: CartItem });

sequelize
  .sync({ force: true })
  .then(async () => {
    console.log("Tables synced successfully");

    const dummyUser = await User.create({
      name: "Rishabh",
      email: "Rishabh@yahoo.com",
    });

    const dummyProduct = await Product.create({
      name: "Watch",
      price: 100,
      description: "This is a titan watch",
    });

    const cartItem = await CartItem.create({
      UserId: dummyUser.id,
      ProductId: dummyProduct.id,
      quantity: 1,
    });

    console.log("Dummy User, Product, and Cart data added successfully");
  })
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
          <td>${product.Users?.[0]?.name || "N/A"}</td>
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

app.get("/cart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await CartItem.findAll({
      where: { UserId: userId },
      include: Product,
    });

    if (cartItems.length === 0) {
      return res.send("No items in the cart");
    }

    let html = `
      <h1>Cart Items for User ID: ${userId}</h1>
      <table border="1" cellpadding="10">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>`;

    cartItems.forEach((item) => {
      html += `
        <tr>
          <td>${item.Product.id}</td>
          <td>${item.Product.name}</td>
          <td>${item.Product.price}</td>
          <td>${item.quantity}</td>
          <td>${item.Product.price * item.quantity}</td>
        </tr>`;
    });

    html += `
        </tbody>
      </table>`;
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching cart items");
  }
});

app.post("/add-to-cart", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cartItem = await CartItem.findOne({
      where: { UserId: userId, ProductId: productId },
    });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      await CartItem.create({
        UserId: userId,
        ProductId: productId,
        quantity: 1,
      });
    }

    res.send("Product added to cart successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding product to cart");
  }
});

app.post("/remove-from-cart", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cartItem = await CartItem.findOne({
      where: { UserId: userId, ProductId: productId },
    });

    if (cartItem) {
      await cartItem.destroy();
      res.send("Product removed from cart");
    } else {
      res.status(404).send("Product not found in cart");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error removing product from cart");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
