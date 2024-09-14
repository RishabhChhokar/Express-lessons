import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addProduct = async (req, res) => {
  const { name, price, category } = req.body;
  try {
    const newProduct = await Product.create({ name, price, category });
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.destroy({ where: { id } });
    res.json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
