// Perform checkout procedure
function checkout() {
  items = getCartItems();
  checkoutRequest(items);
  clearCart();
  location.reload();
}

// Return an array of items from storage
function getCartItems() {
  let items = []
  if (sessionStorage.length > 0) {
    for (let i = 0; i < sessionStorage.length; i++) {
      item = JSON.parse(sessionStorage[sessionStorage.key(i)]);
      items.push({
        name: sessionStorage.key(i),
        image: item.image,
        price: item.price,
        quantity: item.quantity
      });
    }
  }
  return items;
}

// Send items as a post request
function checkoutRequest(items) {
  const request = new XMLHttpRequest();
  request.open('POST', '/checkout', true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      var json = JSON.parse(request.responseText);
      console.log(json.items);
    }
  };
  const data = JSON.stringify({'items': items});
  request.send(data);
}

// Clear session storage
function clearCart() {
  sessionStorage.clear();
}