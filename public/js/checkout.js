function checkout() {
  items = getCartItems();
  checkoutRequest(items);
  clearCart();
  location.reload();
}

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

function checkoutRequest(items) {
  const request = new XMLHttpRequest();
  request.open('POST', '/checkout', false);
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

function clearCart() {
  sessionStorage.clear();
}