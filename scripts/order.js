let products = [];
let cartItems = [];
let finalAmount = 0;

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
              '<a class="ml-auto" id="btn_add" data-id="' + products[i].id + '" onclick="productAdded(this)" href="#purchase" >' +
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
