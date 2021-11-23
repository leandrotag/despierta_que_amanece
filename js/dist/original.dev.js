"use strict";

var Clickbutton = document.querySelectorAll('.boton-carrito');
var tbody = document.querySelector('#tbody');
var carrito = [];
var botonFinalizarCompra = document.querySelector('.btn__comprar');
botonFinalizarCompra.addEventListener('click', comprarButtonClick);
Clickbutton.forEach(function (btn) {
  btn.addEventListener('click', addToCarritoItem);
});

function addToCarritoItem(e) {
  e.preventDefault();
  var button = e.target;
  var item = button.closest('.items');
  var itemTitle = item.querySelector('.card-title').textContent;
  var itemPrice = item.querySelector('.precio').textContent;
  var itemImg = item.querySelector('.card-img-top').src;
  var newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1
  };
  addItemCarrito(newItem);
  addLocalStorage();
}

function addItemCarrito(newItem) {
  var InputElemnto = tbody.getElementsByClassName('input__elemento');

  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].title.trim() === newItem.title.trim()) {
      carrito[i].cantidad++;
      var inputValue = InputElemnto[i];
      inputValue.value++;
      CarritoTotal();
      cartCounterUpdate();
      return null;
    }
  }

  carrito.push(newItem);
  renderCarrito();
}

function renderCarrito() {
  tbody.innerHTML = '';
  carrito.map(function (item) {
    var tr = document.createElement('tr');
    tr.classList.add('ItemCarrito');
    var Content = "\n    \n    <th scope=\"row\">1</th>\n            <td class=\"table__productos\">\n              <img src=".concat(item.img, "  alt=\"\">\n              <h6 class=\"title\">").concat(item.title, "</h6>\n            </td>\n            <td class=\"table__price\"><p>$").concat(item.precio, "</p></td>\n            <td class=\"table__cantidad\">\n              <input type=\"number\" min=\"1\" value=").concat(item.cantidad, " class=\"input__elemento\">\n              <a class=\"delete trashProducto\" href=\"#\" data-id=\"11\"> <img src=\"media/trash_icon.svg\" width=\"30px\" height=\"30px\"></a>  \n              </td>\n    \n    ");
    Swal.fire({
      title: 'Producto añadido correctamente a su carrito de compra',
      icon: 'success',
      html: "<div class=\"card mb-3\" style=\"max-width: 600px;\">\n      <div class=\"row no-gutters\">\n        <div class=\"col-md-4\">\n        <img src = ".concat(item.img, " class=\"card-img\" alt=\"...\">\n        </div>\n        <div class=\"col-md-8\">\n          <div class=\"card-body\">\n            <h5 class=\"card-title\"><strong>").concat(item.title, "</strong></h5>\n            <p class=\"card-text\"><strong>Precio: </strong> ARS $ ").concat(item.precio, "</p>\n          </div>\n        </div>\n      </div>\n    </div>"),
      width: 800,
      padding: '3em',
      backdrop: "\n      rgba(245, 222, 243, 0.8)\n        left top\n        no-repeat\n      ",
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
    tr.innerHTML = Content;
    tbody.append(tr);
    tr.querySelector(".delete").addEventListener('click', removeItemCarrito);
    tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad);
  });
  CarritoTotal();
  cartCounterUpdate();
  addLocalStorage();
}

function CarritoTotal() {
  var Total = 0;
  var itemCartTotal = document.querySelector('.itemCartTotal');
  carrito.forEach(function (item) {
    var precio = item.precio;
    Total = Total + precio * item.cantidad;
  });
  itemCartTotal.innerHTML = "Total $".concat(Total);
  addLocalStorage();
}

function removeItemCarrito(e) {
  e.preventDefault();
  var buttonDelete = e.target;
  var tr = buttonDelete.closest(".ItemCarrito");
  var title = tr.querySelector('.title').textContent;

  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].title.trim() === title.trim()) {
      carrito.splice(i, 1);
    }
  }

  Swal.fire({
    title: 'Su producto fue eliminado del carrito',
    icon: 'error'
  });
  tr.remove();
  CarritoTotal();
  cartCounterUpdate();
  addLocalStorage();
}

function sumaCantidad(e) {
  var sumaInput = e.target;
  var tr = sumaInput.closest(".ItemCarrito");
  var title = tr.querySelector('.title').textContent;
  carrito.forEach(function (item) {
    if (item.title.trim() === title) {
      sumaInput.value < 1 ? sumaInput.value = 1 : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal();
      addLocalStorage();
    }
  });
}

function addLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

window.onload = function () {
  var storage = JSON.parse(localStorage.getItem('carrito'));

  if (storage) {
    carrito = storage;
    renderCarrito();
    addLocalStorage();
  }
}; // Finalizar compra


function comprarButtonClick() {
  tbody.innerHTML = '';
  Swal.fire({
    title: 'Muchas gracias por su compra',
    icon: 'success',
    width: 800,
    padding: '3em',
    backdrop: "\n              rgba(245, 222, 243, 0.8)\n                left top\n                no-repeat\n              ",
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  });
  cartCounterUpdate();
  carrito = [];
  CarritoTotal();
}

function cartCounterUpdate() {
  var table__productoslenght = document.querySelectorAll('.table__productos');
  var cartCounter = document.querySelector('#cart-counter');
  cartCounter.innerHTML = table__productoslenght.length;
}