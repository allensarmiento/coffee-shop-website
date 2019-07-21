window.onload = start();

function start() {
  let active_class = updateActiveNavbar();
  if (active_class === "cartNav") {
    loadCartItems();
  }
  updateCartItems();
}

function loadCartItems() {
  if (sessionStorage.length === 0) {
    document.getElementById("cart").innerHTML += 
    '<div class="m-5">Your cart is empty</div>'
  }
  for (let i=0, len=sessionStorage.length; i<len; i++) {
    let key = sessionStorage.key(i);
    let value = JSON.parse(sessionStorage[key]);

    new_card = 
    '<div class="card mb-3" style="max-width: 540px;">\
      <div class="row no-gutters">\
        <div class="col-md-4">\
          <img src="' + value.image + '" class="card-img" alt="...">\
        </div>\
        <div class="col-md-8">\
          <div class="card-body">\
            <h5 class="card-title">' + key + '</h5>\
            <p class="card-text my-0">Quantity: ' + value.quantity + '</p>\
            <button class="btn btn-sm btn-danger" onclick="removeItem(\'' + key + '\');">Remove</button>\
          </div>\
        </div>\
      </div>\
    </div>';

    document.getElementById("cart").innerHTML += new_card;
  }
}

// Add item to cart
function addToCart(itemName, itemImage) {
  if (sessionStorage.getItem(itemName)) {
    // If item already in session storage
    let value = JSON.parse(sessionStorage[itemName]);
    value.quantity = Number(value.quantity + 1);
    sessionStorage[itemName] = JSON.stringify(value);
  } else {
    // Item not in session storage
    let value = { image: itemImage, quantity: 1 };
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
  } else {
    document.getElementById("homeNav").classList.add("active");
    active_class="homeNav";
  }
  return active_class;
}

// DEBUGGING PURPOSES
function printSessionStorage() {
  for (let i =0, len=sessionStorage.length; i < len; i++) {
    let key = sessionStorage.key(i);
    console.log(key);
  }
}
