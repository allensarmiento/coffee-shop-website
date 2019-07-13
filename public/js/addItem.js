function addToCart(itemName) {
  let cartNumber = document.getElementById("cart-number");
  if (cartNumber.textContent) {
    cartNumber.textContent++;
  } else {
    cartNumber.textContent = 1;
  }
}