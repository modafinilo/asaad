const selectServicio = document.getElementById('servicio');
const checkboxSoporte = document.getElementById('soporte');
const checkboxIntegracion = document.getElementById('integracion');
const inputEmpleados = document.getElementById('empleados');
const botonCalcular = document.getElementById('calcular');
const botonReiniciar = document.querySelector('button[type="reset"]');
const mostrarCostoTotal = document.getElementById('costo-total');
const mostrarDesglose = document.getElementById('desglose');
const divResultado = document.getElementById('resultado');

function calcularCosto(event) {
    event.preventDefault();

    const servicioSeleccionado = selectServicio.options[selectServicio.selectedIndex];
    const costoServicio = parseFloat(servicioSeleccionado.dataset.costo);
    const costoSoporte = checkboxSoporte.checked ? parseFloat(checkboxSoporte.value) : 0;
    const costoIntegracion = checkboxIntegracion.checked ? parseFloat(checkboxIntegracion.value) : 0;
    const cantidadEmpleados = Math.max(1, parseInt(inputEmpleados.value, 10));
    const costoEmpleados = cantidadEmpleados * 10;
    const costoTotal = costoServicio + costoSoporte + costoIntegracion + costoEmpleados;

    let desgloseHTML = '';
    if (costoServicio > 0) {
        desgloseHTML += `<li>Costo del servicio: $${costoServicio.toFixed(2)}</li>`;
    }
    if (costoSoporte > 0) {
        desgloseHTML += `<li>Soporte técnico: $${costoSoporte.toFixed(2)}</li>`;
    }
    if (costoIntegracion > 0) {
        desgloseHTML += `<li>Integración con sistemas: $${costoIntegracion.toFixed(2)}</li>`;
    }
    if (costoEmpleados > 0) {
        desgloseHTML += `<li>Costo por empleados (${cantidadEmpleados} empleados): $${costoEmpleados.toFixed(2)}</li>`;
    }

    mostrarDesglose.innerHTML = `<ul>${desgloseHTML}</ul>`;
    mostrarCostoTotal.textContent = costoTotal.toFixed(2);
    divResultado.style.display = 'block';
}

function reiniciarCalculadora() {
    divResultado.style.display = 'none';
    mostrarDesglose.innerHTML = '';
    mostrarCostoTotal.textContent = '';
}

if (botonCalcular) {
    botonCalcular.addEventListener('click', calcularCosto);
}
if (botonReiniciar) {
    botonReiniciar.addEventListener('click', reiniciarCalculadora);
}


// Almacenar el carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Agregar un producto al carrito
function agregarAlCarrito(producto) {
    const existe = carrito.find(item => item.id === producto.id);
    if (existe) {
        existe.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`${producto.title} se agregó al carrito`);
    mostrarCarrito(); 
}

// Calcular y mostrar el total del carrito
function calcularTotalCarrito() {
    const totalCarrito = document.getElementById('total-carrito');
    const total = carrito.reduce((sum, producto) => sum + (producto.price * producto.cantidad), 0);
    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
}

// Mostrar el carrito en carrito.html
function mostrarCarrito() {
    const contenedorCarrito = document.getElementById('contenedor-carrito');
    if (!contenedorCarrito) return;

    contenedorCarrito.innerHTML = ''; 

    carrito.forEach(producto => {
        const tarjetaCarrito = document.createElement('div');
        tarjetaCarrito.classList.add('tarjeta-carrito');

        tarjetaCarrito.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}" class="imagen-carrito">
            <h3 class="titulo-carrito">${producto.title}</h3>
            <p class="cantidad-carrito">Cantidad: ${producto.cantidad}</p>
            <p class="precio-carrito">Precio Total: $${(producto.price * producto.cantidad).toFixed(2)}</p>
            <button class="boton-eliminar" data-id="${producto.id}">Eliminar</button>
        `;

        const botonEliminar = tarjetaCarrito.querySelector('.boton-eliminar');
        botonEliminar.addEventListener('click', () => eliminarDelCarrito(producto.id));

        contenedorCarrito.appendChild(tarjetaCarrito);
    });

    calcularTotalCarrito(); 
}

// Eliminar un producto del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(producto => producto.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito(); // Actualizar vista del carrito
}

// Vaciar el carrito
const botonVaciarCarrito = document.getElementById('vaciar-carrito');
if (botonVaciarCarrito) {
    botonVaciarCarrito.addEventListener('click', () => {
        carrito = [];
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    });
}

// API

const API_URL = 'https://fakestoreapi.com/products';


const contenedorProductos = document.getElementById('contenedor-productos');

// Obtener productos de la API
async function obtenerProductos() {
    if (!contenedorProductos) return;
    try {
        const respuesta = await fetch(API_URL);
        const productos = await respuesta.json();
        mostrarProductos(productos);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        contenedorProductos.innerHTML = `<p>Error al cargar los productos. Por favor, inténtalo más tarde.</p>`;
    }
}

// Mostrar productos en el DOM
function mostrarProductos(productos) {
    productos.forEach(producto => {
        const tarjetaProducto = document.createElement('div');
        tarjetaProducto.classList.add('tarjeta-producto');

        const descripcionCorta = producto.description.split(' ').slice(0, 20).join(' ');
        const descripcionFinal = producto.description.split(' ').length > 20
            ? `${descripcionCorta}...`
            : descripcionCorta;

        tarjetaProducto.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}" class="imagen-producto">
            <h3 class="titulo-producto">${producto.title}</h3>
            <p class="descripcion-producto">${descripcionFinal}</p>
            <span class="precio-producto">$${producto.price.toFixed(2)}</span>
            <button class="boton-agregar" data-id="${producto.id}">Añadir al carrito</button>
        `;

        const botonAgregar = tarjetaProducto.querySelector('.boton-agregar');
        botonAgregar.addEventListener('click', () => agregarAlCarrito(producto));

        contenedorProductos.appendChild(tarjetaProducto);
    });
}


obtenerProductos();
mostrarCarrito();
