function checkout() {
  // Get all the item names from the cart
  items = [];
  if (sessionStorage.length > 0) {
    for (let i = 0; i < sessionStorage.length; i++) {
      items.push(sessionStorage.key(i));
    }
  }
  // Validate user login
  //
  // Ajax post request
  checkoutRequest(items);
  // Items are checked out, so clear cart
  clearCart();
  location.reload();
}

function checkoutRequest(items) {
  // Send Ajax Post
  var request = new XMLHttpRequest();
  request.open('POST', '/cart/checkout', true);
  // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
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