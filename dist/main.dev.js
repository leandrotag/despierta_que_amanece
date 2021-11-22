"use strict";

//ENTREGA N°6//
function Articulos(nombre, articulo, precio) {
  this.nombre = nombre;
  this.articulo = articulo;
  this.precio = precio;
}

var articulo1 = new Articulos("REMERA RELAX", 123, 950);
var articulo2 = new Articulos("BUSO BASICO CON CIERRE", 124, 1250);
var articulo3 = new Articulos("CONJUNTO BE POSITIVE", 125, 3200);
var PrendasFemeninas = [articulo1, articulo2, articulo3];
PrendasFemeninas.push(articulo4 = new Articulos("REMERA NEGRA", 126, 900));

for (var i = 0; i < PrendasFemeninas.length; i++) {
  console.log(PrendasFemeninas[i]);
}

alert("Elegi los articulos que deseas comprar");

var comprar = function comprar() {
  do {
    var _compra = Number(prompt("Suma los articulos que desees al carrito ingresando el numero.\n\n  (1)- Remera Relax\n  (2)- Buso Basico con cierre\n  (3)- Conjunto Be Positive\n  (4)- Remera Basica Negra\n\n  (5)- Salir"));

    switch (_compra) {
      case 1:
        if (_compra == 1) {
          alert("Elegiste el articulo Remera Relax.");
          document.write("Elegiste el articulo Remera Relax.<br>\n        El precio es de $ ".concat(articulo1.precio, "<br>"));
        }

        comprar();
        break;

      case 2:
        if (_compra == 2) {
          alert("Elegiste el articulo Buso basico con cierre.");
          document.write("Elegiste el articulo Buso basico con cierre.<br>\n        El precio es de $ ".concat(articulo2.precio, "<br>"));
        }

        comprar();
        break;

      case 3:
        if (_compra == 3) {
          alert("Elegiste el articulo Conjunto Be Positive.");
          document.write("Elegiste el articulo Conjunto Be Positive.<br>\n        El precio es de $ ".concat(articulo3.precio, "<br>"));
        }

        comprar();
        break;

      case 4:
        if (_compra == 4) {
          alert("Elegiste el articulo Remera Basica Negra.");
          document.write("Elegiste el articulo Remera Basica Negra.<br>\n          El precio es de $ ".concat(articulo4.precio, "<br>"));
          comprar();
        }

      case 5:
        if (_compra == 5) {
          alert("Saliendo del programa...");
        }

        break;

      default:
        alert("Elegiste una opcion invalida");
        comprar();
    }

    break;
  } while (compra == 5);

  alert("Gracias por visitarnos!");
};

comprar();