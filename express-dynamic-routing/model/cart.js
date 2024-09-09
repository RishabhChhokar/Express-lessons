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
