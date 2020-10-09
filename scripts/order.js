let products = [];

//Load products on load page
$(document).ready(function () {
  loadProducts();
});

function loadProducts() {
  //Load products from products.json
  $.getJSON("products.json", function(data) {
    //Populate the product array
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
    //Create the order menu
    createMenuList();
    //Update cart items
    updatedCartItems();
  });
}

function createMenuList() {
    //Load item by item of products array
    for (i=0;i<products.length;i++) {
        
        //Get qtd from local storage
        let qtd = getItemQtd(products[i].id);
        
        //Check if remove button must be disabled
        let disableRemoveBtn = (qtd > 0)? "" : "disabled";

        //Create product html content
        //Use image, name, price, description, new label
        //Add buttons to increment or decrement the quantity
        let html = (
            `<div class="item">
              <img class="mr-3" src="${products[i].image}" alt="${products[i].name}">
              <div>
                <h5>${ products[i].name } - ${ dollarFormat(products[i].price) }</h5>
                <p>${ products[i].description }</p>
              </div>
              <div class="input-group mb-3 mr-2 ml-auto" style="width:125px;">
                <input type="text" class="form-control ml-auto" min="0" max="99" maxlength="2" type="number" value="${ (qtd > 0)? qtd : "" }" id="${ 'prod_' + products[i].id + '_qtd' }" >
                <div class="input-group-append">
                  <button class="${ 'btn-add-'+ products[i].id } btn btn-success" onclick="updItem(${ products[i].id }, 1)" type="button"><i class="fas fa-plus text-white"></i></button>
                  <button class="${ 'btn-remove-'+ products[i].id } btn btn-danger" onclick="updItem(${ products[i].id }, -1)" ${disableRemoveBtn} type="button"><i class="fas fa-minus text-white"></i></button>
                </div>
              </div>
              ${ (products[i].isnews == true)? '<span class="badge badge-warning">NEW</span>' : '' }
            </div>`);
          
          //Insert the html content into the menu list
          $("#"+ products[i].group +"-list").append(html);
    }
}

function dollarFormat(value) {
    //Format currency value / Eg. 1800 to $18.00
    value = value.toString();
    let pos = value.length - 2;
    let newValue = "$" + value.substr(0, pos) + "." + value.substr(pos)
    return newValue;
}

function updItem(productId, increment) {
    //Get qtd from local storage
    let qtd = getItemQtd(productId) + increment;
    
    //Update qtd in local storage
    setItemQtd(productId, qtd);

    //Update menu qtd
    $("#prod_" + productId + "_qtd").val( (qtd>0)? qtd: "" );

    //enable or disable remove button
    $('.btn-remove-'+ productId).attr("disabled", (qtd>0) ? false : true);

    //Update cart items
    updatedCartItems();
    event.preventDefault();
}

function getItemQtd(productId) {
  //Get product quantity from local storage
  if (localStorage.getItem(productId)) {
    return parseInt(localStorage.getItem(productId));
  }
  return 0;
}

function setItemQtd(productId, qtd) {
  //Set product quantity in local storage
  if (qtd > 0) {
    localStorage.setItem(productId, qtd);
  } else {
    localStorage.removeItem(productId);
  }
}

//On show cart modal update list
$('#modalOrder').on('shown.bs.modal', function () {
  updatedCartItems();
})

function updatedCartItems() {
  //List selected items in the cart modal
  let html = '';
  let totalItems = 0;
  let totalValue = 0;
  
  //Retrieve products stored in local storage
  Object.keys(localStorage).forEach(function(key){
    //Get product info from products array
    let product = products.find(item => item.id == key);

    //Get qtd from local storage
    let qtd = getItemQtd(key);
    let total = qtd * parseInt(product.price);

    //Calculate the total items and value
    totalItems += qtd;
    totalValue += total;

    //Create html to insert in cart list
    //Use product name, qtd and action buttons
    html += (`
      <tr>
        <td>${product.name} - ${dollarFormat(product.price)}</td>
        <td class="text-right">${qtd}</td>
        <td class="text-center">
          <a class="bt-add" onclick="updItem(${ product.id }, 1)" href="#" >
            <i class="fas fa-plus-circle text-success"></i>
          </a>
          <a class="bt-remove" onclick="updItem(${ product.id }, -1)" href="#" >
            <i class="fas fa-minus-circle text-danger"></i>
          </a>
        </td>
      </tr>`);
  });

  //Update total and value
  if (totalItems > 0) {
    $("#cartCount").html(totalItems);
    $("#btnOrderNow").removeClass("disabled");
    html += (`
      <tr>
        <td><strong>Total</strong></td>
        <td colspan="2" class="text-right" ><strong>${dollarFormat(totalValue)}</strong></td>
      </tr>`);
  } else {
    $("#cartCount").html("0");
    $("#btnOrderNow").addClass("disabled");
    html = `<tr><td colspan="3" class="text-center" height="150"><br><br>No items added yet.</td></tr>`; 
  }

  //Insert the html content into cart list
  $("#cart-table tbody").html(html);
}

