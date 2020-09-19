let products = [];
let cartItems = [];

$(document).ready(function () {
  loadProducts();
});

function loadProducts() {
  $.getJSON("products.json", function(data) {
    $.each(data, function (key, item) {
      products.push({
        "id": item.id,
        "group": item.group,
        "name": item.name,
        "description": item.description,
        "image": item.image,
        "price": item.price,
        "isnew": (item.new)? true : false});
    });
    createHtmlList()
  });
}

function createHtmlList() {
    for (i=0;i<products.length;i++) {
        let html = (
            '<div class="item">' +
              '<img class="mr-3" src="' + products[i].image + '" alt="' + products[i].name + '">' +
              '<div>' +
                '<h5>' + products[i].name + ' - ' + dollarFormat(products[i].price) + '</h5>' +
                '<p>' + products[i].description + '</p>' +
              '</div>' +
              '<a class="ml-auto add-button" data-id="' + products[i].id + '" onclick="addItem(' + products[i].id + ')" href="#" >' +
                  '<i class="fas fa-plus-circle text-success"></i>' +
              '</a>' + ((products[i].isnews == true)? '<span class="badge badge-warning">NEW</span>' : '') +
            '</div>');
          $("#"+ products[i].group +"-list").append(html);
    }
}

function dollarFormat(value) {
    value = value.toString();
    let pos = value.length - 2;
    let newValue = "$" + value.substr(0, pos) + "." + value.substr(pos)
    return newValue;
}

function addItem(productId) {
  let currentItemQtd = cartItems[productId]? cartItems[productId] : 0;
  cartItems[productId] = currentItemQtd+1;
  updatedCartItems();
  event.preventDefault();
}

function removeItem(productId) {
  let currentItemQtd = cartItems[productId]? cartItems[productId] : 0;
  cartItems[productId] = currentItemQtd -1;
  updatedCartItems();
  event.preventDefault();
}

function updatedCartItems() {
  let html = '';
  let totalItems = 0;
  let totalValue = 0;
  
  for (let i=0; i < cartItems.length; i++) {
    if (cartItems[i]) {
      let product = products.find(item => item.id == i);
      totalItems += cartItems[i];
      totalValue += cartItems[i] * product.price;
      html += (`
        <tr>
          <td>`+ product.name +` - `+ dollarFormat(product.price) +`</td>
          <td class="text-right">`+ cartItems[i] +`</td>
          <td class="text-center">
            <a class="bt-remove" onclick="removeItem(`+ product.id +`)" href="#" >
              <i class="fas fa-times-circle text-danger"></i>
            </a>
          </td>
        </tr>`);
    }
  }

  if (totalItems > 0) {
    $("#cartCount").html(totalItems);
    $("#btnOrderNow").removeClass("disabled");

    html += (`
      <tr>
        <td><strong>Total</strong></td>
        <td colspan="2" class="text-right" ><strong>`+ dollarFormat(totalValue) +`</strong></td>
      </tr>`);

  } else {
    $("#cartCount").html("0");
    $("#btnOrderNow").addClass("disabled");
    html = `<tr><td colspan="3" class="text-center" height="150"><br><br>No items added yet.</td></tr>`; 
  }

  $("#cart-table tbody").html(html);
}

