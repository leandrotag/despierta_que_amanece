const Clickbutton = document.querySelectorAll('.boton-carrito')
const tbody = document.querySelector('#tbody')
let carrito = []
const botonFinalizarCompra = document.querySelector('.btn__comprar');
botonFinalizarCompra.addEventListener('click', comprarButtonClick);

Clickbutton.forEach(btn => {
	btn.addEventListener('click', addToCarritoItem)
})


function addToCarritoItem(e) {
	e.preventDefault();
	const button = e.target
	const item = button.closest('.items')
	const itemTitle = item.querySelector('.card-title').textContent;
	const itemPrice = item.querySelector('.precio').textContent;
	const itemImg = item.querySelector('.card-img-top').src;

	const newItem = {
		title: itemTitle,
		precio: itemPrice,
		img: itemImg,
		cantidad: 1
	}

	addItemCarrito(newItem)
	addLocalStorage()
}


function addItemCarrito(newItem) {
	const InputElemnto = tbody.getElementsByClassName('input__elemento')
	for (let i = 0; i < carrito.length; i++) {
		if (carrito[i].title.trim() === newItem.title.trim()) {
			carrito[i].cantidad++;
			const inputValue = InputElemnto[i]
			inputValue.value++;
			CarritoTotal()
			cartCounterUpdate()
			return null;
		}
	}

	carrito.push(newItem)

	renderCarrito()

}
$('#carticon').on('click', scrollDown);

function scrollDown(e) {
	e.preventDefault();
	$('html, body').animate({
		scrollTop: $('#carroDeCompras').offset().top
	}, 2000, () => {
		console.log("Scroll terminado")
	})
}

$('#continuar_comprandro').on('click', scrollTop);

function scrollTop(e) {
	e.preventDefault();
	$('html, body').animate({
		scrollTop: $('.card-img-top').offset().top
	}, 2000, () => {
		console.log("Scroll terminado")
	})
}

function renderCarrito() {
	tbody.innerHTML = ''
	carrito.map(item => {

		const tr = document.createElement('tr')
		tr.classList.add('ItemCarrito')
		const Content = `
    
    <th scope="row">1</th>
            <td class="table__productos ml-5">
              <img src=${item.img} class="d-flex align-items-center" alt="">
              <h6 class="title ml-5 d-flex align-items-center">${item.title}</h6>
            </td>
            <td class="table__price"><p>$${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <a class="delete trashProducto" href="#" data-id="11"> <img src="media/trash_icon.svg" width="30px" height="30px"></a>  
              </td>
    
    `

		tr.innerHTML = Content;
		tbody.append(tr)
		Swal.fire({
			title: 'Producto añadido correctamente a su carrito de compra',
			icon: 'success',
			html: `<div class="card mb-3" style="max-width: 600px;">
      <div class="row no-gutters">
        <div class="col-md-4">
        <img src = ${item.img} class="card-img ml-5" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title ml-5"><strong>${item.title}</strong></h5>
            <p class="card-text"><strong>Precio: </strong> ARS $ ${item.precio}</p>
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

			}
		})
		tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
		tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
	})

	CarritoTotal()
	cartCounterUpdate()
	addLocalStorage()
}

function CarritoTotal() {
	let Total = 0;
	const itemCartTotal = document.querySelector('.itemCartTotal')
	carrito.forEach((item) => {
		const precio = item.precio
		Total = Total + precio * item.cantidad
	})

	itemCartTotal.innerHTML = `Total $${Total}`
	addLocalStorage()
}

function removeItemCarrito(e) {
	e.preventDefault();
	const buttonDelete = e.target
	const tr = buttonDelete.closest(".ItemCarrito")
	const title = tr.querySelector('.title').textContent;
	for (let i = 0; i < carrito.length; i++) {

		if (carrito[i].title.trim() === title.trim()) {
			carrito.splice(i, 1)
		}
	}
	Swal.fire({
		title: 'Su producto fue eliminado del carrito',
		icon: 'error'
	})

	tr.remove()
	CarritoTotal()
	cartCounterUpdate()
	addLocalStorage()
}

function sumaCantidad(e) {

	const sumaInput = e.target
	const tr = sumaInput.closest(".ItemCarrito")
	const title = tr.querySelector('.title').textContent;
	carrito.forEach(item => {
		if (item.title.trim() === title) {
			sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
			item.cantidad = sumaInput.value;
			CarritoTotal()
			addLocalStorage()
		}
	})
}

function addLocalStorage() {
	localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function() {
	const storage = JSON.parse(localStorage.getItem('carrito'));
	if (storage) {
		carrito = storage;
		renderCarrito()
		addLocalStorage()
	}
}


// Finalizar compra

function comprarButtonClick() {

	tbody.innerHTML = ''
	Swal.fire({
		title: 'Muchas gracias por su compra',
		icon: 'success',
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

		}
	})
	if (carrito.length == 0) {
		Swal.fire({
			title: 'Su carrito no contiene productos',
			icon: 'error'
		})
	}
	cartCounterUpdate()
	carrito = []
	CarritoTotal()
}

function cartCounterUpdate() {
	const table__productoslenght = document.querySelectorAll('.table__productos');
	const cartCounter = document.querySelector('#cart-counter');
	cartCounter.innerHTML = table__productoslenght.length
}