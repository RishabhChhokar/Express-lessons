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

const carts = [];

export function getOrCreateCart(userId) {
  let cart = carts.find((c) => c.userId === userId);
  if (!cart) {
    cart = { userId, items: [] };
    carts.push(cart);
  }
  return cart;
}

export function addToCart(userId, product) {
  const cart = getOrCreateCart(userId);
  const existingItem = cart.items.find(
    (item) => item.product.id === product.id
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ product, quantity: 1 });
  }
}

export function deleteProductById(productId) {
  const index = products.findIndex((p) => p.id == productId);
  if (index !== -1) {
    products.splice(index, 1);
  }
}
