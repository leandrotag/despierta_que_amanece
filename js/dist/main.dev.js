"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function Articulos(nombre, articulo, precio, talle) {
  this.nombre = nombre;
  this.articulo = articulo;
  this.precio = precio;
  this.talle = talle;
}

var articulo1 = new Articulos("REMERA RELAX", 123, 950, "Unico");
var articulo2 = new Articulos("BUSO BASICO CON CIERRE", 124, 1250, "Unico");
var articulo3 = new Articulos("CONJUNTO BE POSITIVE", 125, 3200, "Unico");
var articulo4 = new Articulos("BUSO TREKKING", 126, 1350, "Unico");
var articulo5 = new Articulos("BUSO CANGURO BASICO", 127, 1400, "Unico");
var articulo6 = new Articulos("CALZA LYCRA NEGRA", 128, 750, "Unico");
var articulo7 = new Articulos("CAMPERA GRIS ALGODON", 129, 1500, "Unico");
var articulo8 = new Articulos("PANTALON CON CIERRE LATERAL", 130, 1250, "Unico");
var articulo9 = new Articulos("REMERA BASICA MOSTAZA", 131, 900, "Unico");
var articulo10 = new Articulos("REMERA BASICA NEGRA", 132, 900, "Unico");
var articulo11 = new Articulos("CONJUNTO BLACK", 133, 2750, "Unico");
var articulo12 = new Articulos("CONJUNTO SPORT", 134, 3100, "Unico");
var PrendasFemeninas = [articulo1, articulo2, articulo3, articulo4, articulo5, articulo6, articulo7, articulo8, articulo9, articulo10, articulo11, articulo12];
var carrito = [];
document.addEventListener('DOMContentLoaded', function () {
  var carritoStorage = JSON.parse(localStorage.getItem('carrito'));
  carrito = carritoStorage || [];
});
$('#carticon').on('click', scrollDown);

function scrollDown(e) {
  e.preventDefault();
  $('html, body').animate({
    scrollTop: $('#carroDeCompras').offset().top
  }, 2000, function () {
    console.log("Scroll terminado");
  });
}

$('#continuar_comprandro').on('click', scrollTop);

function scrollTop(e) {
  e.preventDefault();
  $('html, body').animate({
    scrollTop: $('.card-img-top').offset().top
  }, 2000, function () {
    console.log("Scroll terminado");
  });
}

function actualizarStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

$(document).ready(function () {
  console.log("Bienvenido a la seccion de compras de Despierta que Amanece.");
});

for (var i = 0; i < PrendasFemeninas.length; i++) {
  console.log(PrendasFemeninas[i]);
}

var divPadre = document.querySelector('#t__body');
var agregar_carritos = document.querySelectorAll('.boton-carrito');
agregar_carritos.forEach(function (agregar_carrito) {
  agregar_carrito.addEventListener('click', agregarProducto);
});

function agregarProducto(e) {
  e.preventDefault();
  var button = e.target;
  var items = button.closest('.items');
  var productCard = e.target.parentElement.parentElement;
  var itemTitle = items.querySelector('.card-text').textContent;
  var itemPrice = items.querySelector('.card-precio').textContent;
  var itemImage = items.querySelector('.card-img-top').src;
  var itemId = items.querySelector('.boton-carrito').dataset.id;
  var cantidad = 1;
  var itemTalle = "Unico";
  var existe = carrito.some(function (producto) {
    return producto.id === itemId;
  });

  if (e.target.nodeName === "A") {
    Swal.fire({
      title: 'Producto añadido correctamente a su carrito de compra',
      icon: 'success',
      html: "<div class=\"card mb-3\" style=\"max-width: 600px;\">\n      <div class=\"row no-gutters\">\n        <div class=\"col-md-4\">\n        <img src = ".concat(itemImage, " class=\"card-img\" alt=\"...\">\n        </div>\n        <div class=\"col-md-8\">\n          <div class=\"card-body\">\n            <h5 class=\"card-title\"><strong>").concat(itemTitle, "</strong></h5>\n            <p class=\"card-text\"><strong>Precio: </strong>").concat(itemPrice, " ARS </p>\n            <p class=\"card-text\"><strong>Talle: </strong>").concat(itemTalle, "</p>\n          </div>\n        </div>\n      </div>\n    </div>"),
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
  }

  if (existe) {
    var nuevoCarrito = carrito.map(function (producto) {
      if (producto.id === itemId) {
        producto.cantidad++;
      }

      return producto;
    });
    carrito = _toConsumableArray(nuevoCarrito);
  } else {
    carrito.push({
      title: itemTitle,
      price: itemPrice,
      image: itemImage,
      id: itemId,
      cantidad: itemCantidad,
      talle: itemTalle
    });
  }

  ;
  divPadre.addEventListener('click', eliminarProducto);
  var nCantidad = Object.values(carrito).reduce(function (acc, _ref) {
    var cantidad = _ref.cantidad;
    return acc + cantidad;
  }, 0);
  var nPrecio = Object.values(carrito).reduce(function (acc, _ref2) {
    var cantidad = _ref2.cantidad,
        price = _ref2.price;
    return acc + cantidad * price;
  }, 0);
  console.log(nPrecio);
  actualizarCarrito();
  actualizarStorage();

  function actualizarCarrito() {
    divPadre.innerHTML = "";
    var tr = document.createElement('tr');
    carrito.forEach(function (producto) {
      tr.innerHTML += // `<div class="card mb-2" style="width: 600px; height: 150px;" >
      //       <div class="row no-gutters">
      //         <div class="col-md-4">
      //         <img src = ${producto.image} style="width: 100px; height: 100px" class="img__addcart card-img" alt="...">
      //         </div>
      //         <div class="col-md-8">
      //           <div class="card_DOM card-body">
      //           <p class="span__card1 card-title"><strong>${producto.title}</strong></p>
      //          <a class="trashProducto" href="#" data-id=${producto.id}> <img src="media/trash_icon.svg"  width="30px" height="30px"></a>  
      //             <p class="span__card card-text"><strong>Precio: </strong>$${producto.price} ARS</p>
      //             <p class="span__card card-text"><strong>Talle: </strong> ${producto.talle}</p>
      //             <p class="span__card1 card-text"><strong>Cantidad: </strong> ${producto.cantidad}</p>
      //             </div>
      //         </div>
      //       </div>
      //     </div>`,   
      "<th scope=\"row\">1</th>\n  <td class=\"table__productos\">\n    <img src=".concat(itemPrice, "  alt=\"\">\n    <h6 class=\"title\">").concat(itemTitle, "</h6>\n  </td>\n  <td class=\"table__price\"><p>").concat(itemPrice, "</p></td>\n  <td class=\"table__cantidad\">\n    <input type=\"number\" min=\"1\" value=").concat(cantidad, " class=\"input__elemento\">\n    <a class=\"trashProducto\" href=\"#\" data-id=\"11\"> <img src=\"media/trash_icon.svg\" width=\"30px\" height=\"30px\"></a>  \n    </td>");
      divPadre.innerHTML = "";
      divPadre.appendChild(tr);
    });
  }

  function eliminarProducto(e) {
    e.preventDefault();

    if (e.target.nodeName === "IMG") {
      var id = e.target.closest('a').dataset.id;
      var carritoFiltrado = carrito.filter(function (producto) {
        return producto.id !== id;
      });
      carrito = _toConsumableArray(carritoFiltrado);
      Swal.fire({
        title: 'Su producto fue eliminado del carrito',
        icon: 'error'
      });
      actualizarCarrito();
      actualizarStorage();
    }
  }
}