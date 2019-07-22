window.onload = start();

// Executed across all pagess 
function start() {
  let active_class = updateActiveNavbar();
  if (active_class === "cartNav" || url.search("checkout") >= 0) {
    loadCartItems();
      if (sessionStorage.length > 0) {
      if (active_class === "cartNav") {
        displayShoppingTotal();
      } else if (url.search("checkout") >= 0) {
        displayTotal();
      }
    }
  }
  updateCartItems();
}

function displayShoppingTotal() {
  let total = 0.00;
  for (let i=0, len=sessionStorage.length; i<len; i++) {
    let key = sessionStorage.key(i);
    let value = JSON.parse(sessionStorage[key]);
    total += value.price * value.quantity;
  }
  document.getElementById("cart").innerHTML += 
    '<h5>Shopping Total: $' + Number.parseFloat(total).toFixed(2) + '</h5>\
    <a class="btn btn-warning" href="/checkout">Proceed to Checkout</a>';
}

function displayTotal() {
  let shop_total = 0.00;
  let taxes = 0;
  let tax_rate = 0.075;
  let total = 0;
  for (let i=0, len=sessionStorage.length; i<len; i++) {
    let key = sessionStorage.key(i);
    let value = JSON.parse(sessionStorage[key]);
    shop_total += value.price * value.quantity;
    taxes = shop_total * tax_rate;
    total = shop_total + taxes;
  }
  document.getElementById("cart").innerHTML += 
    '\
      <h5>Items: $' + Number.parseFloat(shop_total).toFixed(2) + '</h5>\
      <h5>Taxes: $' + Number.parseFloat(taxes).toFixed(2) + '<h5>\
      <h5>Total: $' + Number.parseFloat(total).toFixed(2) + '</h5>\
    ';
}

// Load the cart items from session storage
function loadCartItems() {
  checkEmptyCart();
  for (let i=0, len=sessionStorage.length; i<len; i++) {
    let key = sessionStorage.key(i);
    let value = JSON.parse(sessionStorage[key]);
    let new_card = makeNewCard(key, value);
    document.getElementById("cart").innerHTML += new_card;
  }
}

// Add item to cart
function addToCart(itemName, itemImage) {
  if (sessionStorage.getItem(itemName)) {
    // Item exists in storage
    let value = JSON.parse(sessionStorage[itemName]);
    value.quantity = Number(value.quantity + 1);
    sessionStorage[itemName] = JSON.stringify(value);
  } else {
    // Item not in session storage
    let value = { image: itemImage, quantity: 1, price: 1.11 };
    sessionStorage.setItem(itemName, JSON.stringify(value)); // key: item name, value: quantity
  }
  updateCartItems();
}

// Update the number of cart items
function updateCartItems() {
  // Id with span to update cart counter
  let cartNumber = document.getElementById("cart-number");
  let count = 0;
  // Count the number of items in art
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

// Remove item from storage
function removeItem(key) {
  if (sessionStorage.getItem(key)) {
    sessionStorage.removeItem(key);
    location.reload();
  }
  updateCartItems();
}

// Update Navbar
function updateActiveNavbar() {
  url = window.location.href;
  let active_class = "";
  if (url.search("shop") >= 0) {
    document.getElementById("shopNav").classList.add("active");
    active_class = "shopNav";
  } else if (url.search("stores") >= 0) {
    document.getElementById("storesNav").classList.add("active");
    active_class="storesNav"; 
  } else if (url.search("story") >= 0) {
    document.getElementById("storyNav").classList.add("active");
    active_class="storyNav";
  } else if (url.search("joinUs") >= 0) {
    document.getElementById("joinUsNav").classList.add("active");
    active_class="joinUsNav";
  } else if (url.search("account") >= 0) {
    document.getElementById("accountNav").classList.add("active");
    active_class="accountNav";
  } else if (url.search("cart") >= 0) {
    document.getElementById("cartNav").classList.add("active");
    active_class="cartNav";
  } else if (url.search("orders") >= 0) {
    document.getElementById("ordersNav").classList.add("active");
    active_class="ordersNav";
  } else {
    document.getElementById("homeNav").classList.add("active");
    active_class="homeNav";
  }
  return active_class;
}

// Display message if cart is empty
function checkEmptyCart() {
  if (sessionStorage.length === 0) {
    document.getElementById("cart").innerHTML += 
    '<div class="m-5">Your cart is empty</div>'
  }
}

// Create a new card
function makeNewCard(key, value) {
  let new_card = 
    '<div class="card mb-3" style="max-width: 540px;">\
      <div class="row no-gutters">\
        <div class="col-md-4">\
          <img src="' + value.image + '" class="card-img" alt="...">\
        </div>\
        <div class="col-md-8">\
          <div class="card-body">\
            <h5 class="card-title">' + key + '</h5>\
            <p class="card-text my-0">Quantity: ' + value.quantity + '</p>\
            <p class="card-text my-0">Price: $' + Number.parseFloat(value.price * value.quantity).toFixed(2) + '</p>\
            <button class="btn btn-sm btn-danger" onclick="removeItem(\'' + key + '\');">Remove</button>\
          </div>\
        </div>\
      </div>\
    </div>';
  return new_card;
}

// DEBUGGING PURPOSES
function printSessionStorage() {
  for (let i =0, len=sessionStorage.length; i < len; i++) {
    let key = sessionStorage.key(i);
    console.log(key);
  }
}
