var productData = [
  {
    id: 1,
    imageOne: "images/1.jpg",
    imageTwo: "images/2.jpg",
    discountRate: "-15%",
    status: "New",
    name: "Lorem ipsum access one",
    currentPrice: 2.79,
    oldPrice: 3.1,
  },
  {
    id: 2,
    imageOne: "images/1.jpg",
    imageTwo: "images/2.jpg",
    discountRate: "-5%",
    status: "New",
    name: "Lorem ipsum access two",
    currentPrice: 3.15,
    oldPrice: 2.1,
  },
  {
    id: 3,
    imageOne: "images/1.jpg",
    imageTwo: "images/2.jpg",
    discountRate: "-10%",
    status: "New",
    name: "Lorem ipsum access three",
    currentPrice: 4.5,
    oldPrice: 1.3,
  },
  {
    id: 4,
    imageOne: "images/1.jpg",
    imageTwo: "images/2.jpg",
    discountRate: "-8%",
    status: "New",
    name: "Lorem ipsum access four",
    currentPrice: 6.3,
    oldPrice: 5.3,
  },
  {
    id: 5,
    imageOne: "images/1.jpg",
    imageTwo: "images/2.jpg",
    discountRate: "-5%",
    status: "New",
    name: "Lorem ipsum access five",
    currentPrice: 5.25,
    oldPrice: 5.0,
  },
  {
    id: 6,
    imageOne: "images/1.jpg",
    imageTwo: "images/2.jpg",
    discountRate: "-7%",
    status: "New",
    name: "Lorem ipsum access six",
    currentPrice: 7.19,
    oldPrice: 5.99,
  },
  {
    id: 7,
    imageOne: "images/1.jpg",
    imageTwo: "images/2.jpg",
    discountRate: "-13%",
    status: "New",
    name: "Lorem ipsum access seven",
    currentPrice: 3.12,
    oldPrice: 2.8,
  },
  {
    id: 8,
    imageOne: "images/1.jpg",
    imageTwo: "images/2.jpg",
    discountRate: "-1%",
    status: "New",
    name: "Lorem ipsum access eight",
    currentPrice: 6.8,
    oldPrice: 7.1,
  },
  {
    id: 9,
    imageOne: "images/1.jpg",
    imageTwo: "images/2.jpg",
    discountRate: "-25%",
    status: "New",
    name: "Lorem ipsum access nine",
    currentPrice: 7.46,
    oldPrice: 6.13,
  },
  {
    id: 10,
    imageOne: "images/1.jpg",
    imageTwo: "images/2.jpg",
    discountRate: "-23%",
    status: "New",
    name: "Lorem ipsum access ten",
    currentPrice: 9.12,
    oldPrice: 10.2,
  },
];

var $productList = document.getElementById("product-list");
var $cartAmount = document.getElementById("cart-amount");
var $cartTableBody = document.getElementById("cart-table-body");

// get localstorage array
var cartArray = getLocalStorageCart();
$cartAmount.innerHTML = cartArray.length;

// HOME PAGE

productData.forEach(addProductList);

function addProductList(value) {
  var li = document.createElement("li");
  li.className = "product-item";
  li.innerHTML =
    "<div class='product-image'>" +
    "<a href='#'>" +
    "<img src='" +
    value.imageOne +
    "' alt='Product 1' class='default-image' />" +
    "<img src='" +
    value.imageTwo +
    "' alt='Product 2' class='hover-image' />" +
    "</a>" +
    "<div class='product-image-badges'>" +
    "<span class='discount-rate pink'>" +
    value.discountRate +
    "</span>" +
    "<span class='product-status purple'>" +
    value.status +
    "</span>" +
    "</div>" +
    "<div class='product-actions'>" +
    "<button class='action-icon' title='Add to cart' onClick='addToCart(this, " +
    value.id +
    ")'>" +
    "<i class='fas fa-shopping-cart'></i>" +
    "<button class='action-icon' title='Quick View'>" +
    "<i class='fas fa-eye'></i>" +
    "</button>" +
    "<button class='action-icon' title='Add to compare'>" +
    "<i class='fas fa-retweet'></i>" +
    "</button>" +
    "</div>" +
    "</div>" +
    "<div class='product-content'>" +
    "<div class='product-info'>" +
    "<h3 class='product-name'>" +
    "<a href='#'>" +
    value.name +
    "</a>" +
    "</h3>" +
    "<p class='current-price'>€" +
    value.currentPrice +
    "<span class='old-price pink'>" +
    "<del>€" +
    value.oldPrice +
    "</del>" +
    "</span>" +
    "</p>" +
    "</div>" +
    "<div class='product-wishlist'>" +
    "<button class='btn-wish-list' title='Addtowishlist'>" +
    "<i class='far fa-heart'></i>" +
    "</button>" +
    "</div>" +
    "</div>";
  $productList && $productList.appendChild(li);
}

function addToCart(element, id) {
  // get item frome id
  var item = productData.find(function (item) {
    return item.id === id;
  });
  // if item is in cartArray -> do nothing
  var checkExist = cartArray.some(function (el) {
    return el.id === id;
  });
  if (checkExist) {
    return;
  }
  // if item not in cartArray -> add to cart
  cartArray.push(item);
  // set cart localstorage
  setLocalStorageCart();
  // set amount of item in cart icon on header main
  $cartAmount.innerHTML = cartArray.length;
  // disable button
  element.classList.add("active");
  element.disabled = true;
}

function getLocalStorageCart() {
  return localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
}

function removeLocalStorageCart(id) {
  var index = cartArray.findIndex(function (element) {
    return element.id === id;
  });
  if (index !== -1) cartArray.splice(index, 1);
  setLocalStorageCart();
  // remove cart item in localStorage
  if (cartArray.length === 0) {
    localStorage.removeItem("cart");
  }
}

function setLocalStorageCart() {
  return localStorage.setItem("cart", JSON.stringify(cartArray));
}

// SHOPPING CART
(function () {
  // check if array is empty
  if (!cartArray.length) {
    // $cartTableBody && $cartTableBody.empty();
  }
  // if array not empty
  cartArray.forEach(addCartItem);
})();

function addCartItem(value, index) {
  var tr = document.createElement("tr");
  tr.innerHTML =
    "<td class='product-img'>" +
    "<a href='#'>" +
    "<img src='" +
    value.imageOne +
    "' alt='product-img'>" +
    "</a>" +
    "</td>" +
    "<td>" +
    "<h3 class='product-name'><a href='#'>" +
    value.name +
    "</a></h3>" +
    "</td>" +
    "<td>" +
    "<p class='current-price txt-center'>€" +
    value.currentPrice +
    "<span class='old-price pink'>" +
    "<del>€" +
    value.oldPrice +
    "</del>" +
    "</span>" +
    "</p>" +
    "</td>" +
    "<td>" +
    "<form action='' class='form-quantity'>" +
    "<button class='btn btn-decrease'>-</button>" +
    "<input type='text' value='1' class='form-input-number txt-center' readonly>" +
    "<button class='btn btn-increase'>+</button>" +
    "</form>" +
    "</td>" +
    "<td>" +
    "<span class='product-subtotal txt-center'>€" +
    value.currentPrice +
    "</span>" +
    "</td>" +
    "<td>" +
    "<a class='btn btn-remove txt-center' onClick='removeCartItem(this, " +
    value.id +
    ")'>X</a>" +
    "</td>";

  $cartTableBody && $cartTableBody.appendChild(tr);
}

function removeCartItem(element, id) {
  removeLocalStorageCart(id);
  console.log(cartArray);
  var item = element.parentNode.parentNode;
  item.remove();
}
