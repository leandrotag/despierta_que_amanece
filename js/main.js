function Articulos(nombre,articulo,precio,talle) {
  this.nombre = nombre;
  this.articulo = articulo;
  this.precio = precio;
  this.talle = talle;
}

const articulo1 = new Articulos ("REMERA RELAX", 123, 950,"Unico");
const articulo2 = new Articulos ("BUSO BASICO CON CIERRE", 124, 1250,"Unico");
const articulo3 = new Articulos ("CONJUNTO BE POSITIVE", 125, 3200,"Unico");
const articulo4 = new Articulos ("BUSO TREKKING",126,1350,"Unico")
const articulo5 = new Articulos ("BUSO CANGURO BASICO",127,1400,"Unico")
const articulo6 = new Articulos ("CALZA LYCRA NEGRA",128,750,"Unico")
const articulo7 = new Articulos ("CAMPERA GRIS ALGODON",129,1500,"Unico")
const articulo8 = new Articulos ("PANTALON CON CIERRE LATERAL",130,1250,"Unico")
const articulo9 = new Articulos ("REMERA BASICA MOSTAZA",131,900,"Unico")
const articulo10 = new Articulos ("REMERA BASICA NEGRA",132,900,"Unico")
const articulo11 = new Articulos ("CONJUNTO BLACK",133,2750,"Unico")
const articulo12 = new Articulos ("CONJUNTO SPORT",134,3100,"Unico")

const PrendasFemeninas = [articulo1 , articulo2, articulo3,articulo4,
  articulo5,articulo6,articulo7,articulo8,articulo9,articulo10,articulo11,articulo12];

  let carrito = [];

  document.addEventListener('DOMContentLoaded', () => {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito'));
  
    carrito = carritoStorage || [];
  });

$('#carticon').on('click', scrollDown);
function scrollDown(e){
  e.preventDefault();
  $('html, body').animate({
    scrollTop: $('#carroDeCompras').offset().top
  },2000, () => {
      console.log("Scroll terminado")
})
}

$('#continuar_comprandro').on('click', scrollTop);
function scrollTop(e){
  e.preventDefault();
  $('html, body').animate({
    scrollTop: $('.card-img-top').offset().top
  },2000, () => {
      console.log("Scroll terminado")
})
}


  function actualizarStorage(){
    localStorage.setItem('carrito',JSON.stringify(carrito))
 }
  
$(document).ready( ()=>{
  console.log("Bienvenido a la seccion de compras de Despierta que Amanece.")
})

for (let i = 0; i <PrendasFemeninas.length; i++ ){
  console.log(PrendasFemeninas[i])
  }

const divPadre = document.querySelector('#t__body')
const agregar_carritos = document.querySelectorAll('.boton-carrito');

agregar_carritos.forEach((agregar_carrito) => {
  agregar_carrito.addEventListener('click',agregarProducto)
});

function agregarProducto(e){
  e.preventDefault();
  const button = e.target;
  const items = button.closest('.items'); 
  const productCard = e.target.parentElement.parentElement;
  const itemTitle = items.querySelector('.card-text').textContent;
  const itemPrice = items.querySelector('.card-precio').textContent; 
  const itemImage = items.querySelector('.card-img-top').src;
  const itemId = items.querySelector('.boton-carrito').dataset.id; 
  const cantidad  = 1;
  const itemTalle = "Unico";
  const existe = carrito.some(producto => producto.id === itemId) 
  if(e.target.nodeName === "A"){
    Swal.fire({
      title: 'Producto añadido correctamente a su carrito de compra',
      icon: 'success',
      html: `<div class="card mb-3" style="max-width: 600px;">
      <div class="row no-gutters">
        <div class="col-md-4">
        <img src = ${itemImage} class="card-img" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title"><strong>${itemTitle}</strong></h5>
            <p class="card-text"><strong>Precio: </strong>${itemPrice} ARS </p>
            <p class="card-text"><strong>Talle: </strong>${itemTalle}</p>
          </div>
        </div>
      </div>
    </div>`,
      width: 800,
      padding: '3em',
      backdrop: `
      rgba(245, 222, 243, 0.8)
        left top
        no-repeat
      `,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
        
      }})
  }
  if (existe) {
    const nuevoCarrito = carrito.map(producto => {
      if (producto.id === itemId) {
        producto.cantidad ++; 
      }
      return producto;
    });
    carrito = [...nuevoCarrito];
  } else {
    carrito.push({
    title: itemTitle,
    price: itemPrice,
    image: itemImage,
    id: itemId,
    cantidad : itemCantidad,
    talle: itemTalle,
})

};




divPadre.addEventListener('click',eliminarProducto)
const nCantidad = Object.values(carrito).reduce((acc,{cantidad}) => acc + cantidad, 0)
const nPrecio = Object.values(carrito).reduce((acc, {cantidad,price}) => acc + cantidad * price, 0)
console.log(nPrecio)

actualizarCarrito();
actualizarStorage();

  function actualizarCarrito() {
    divPadre.innerHTML = "";
    const tr = document.createElement('tr');
  carrito.forEach(producto => {
  tr.innerHTML += 
  // `<div class="card mb-2" style="width: 600px; height: 150px;" >
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
  `<th scope="row">1</th>
  <td class="table__productos">
    <img src=${itemPrice}  alt="">
    <h6 class="title">${itemTitle}</h6>
  </td>
  <td class="table__price"><p>${itemPrice}</p></td>
  <td class="table__cantidad">
    <input type="number" min="1" value=${cantidad} class="input__elemento">
    <a class="trashProducto" href="#" data-id="11"> <img src="media/trash_icon.svg" width="30px" height="30px"></a>  
    </td>`

        divPadre.innerHTML = "";
    divPadre.appendChild(tr);
    
  })}

  function eliminarProducto(e) {
    e.preventDefault();
    if (e.target.nodeName === "IMG") {
        const id = e.target.closest('a').dataset.id;
         const carritoFiltrado = carrito.filter(producto => producto.id !== id); 
         carrito = [...carritoFiltrado];
        Swal.fire({
            title: 'Su producto fue eliminado del carrito',
            icon: 'error'
          })
        actualizarCarrito();
        actualizarStorage();
    }}}



