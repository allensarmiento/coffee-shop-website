// Add item to cart
function addToCart(itemName, itemImage) {
  if (sessionStorage.getItem(itemName)) {
    // If item already in session storage
    let value = JSON.parse(sessionStorage[itemName]);
    value.quantity = Number(value.quantity + 1);
    sessionStorage[itemName] = JSON.stringify(value);
  } else {
    // Item not in session storage
    let value = {
      image: itemImage,
      quantity: 1
    };
    sessionStorage.setItem(itemName, JSON.stringify(value)); // key: item name, value: quantity
  }
  // Update cart number
  updateCartItems();
}

// Update the number of cart items
function updateCartItems() {
  // Get place to show the number of items in cart
  let cartNumber = document.getElementById("cart-number");
  let count = 0;
  // Loop through items in cart and count the quantity
  for (let i=0, len=sessionStorage.length; i<len; i++) {
    let key = sessionStorage.key(i);
    let value = JSON.parse(sessionStorage[key]);
    quantity = Number(value.quantity);
    count += quantity;
    // Update cart item number if greater than 0
    if (Number(count) > 0) {
      cartNumber.textContent = Number(count);
    }
  }
}

function clearCart() {
  sessionStorage.clear();
}

function printSessionStorage() {
  for (let i =0, len=sessionStorage.length; i < len; i++) {
    let key = sessionStorage.key(i);
    console.log(key);
  }
}