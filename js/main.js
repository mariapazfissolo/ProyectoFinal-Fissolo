// Variable para almacenar los productos en el carrito
let carritoRopa = [];

// Función para agregar los productos al carrito
function agregarAlCarrito(boton) {
    // Obtener el contenedor del producto
    let productoRopa = boton.parentNode;

    // Verificar que productoRopa no sea undefined
    if (productoRopa) {
        // Obtener datos del producto
        let nombre = productoRopa.getAttribute('data-nombre');
        let precio = parseFloat(productoRopa.getAttribute('data-precio'));

        // Crear objeto del producto 
        let nuevoProductoRopa = {
            nombre: nombre,
            precio: precio
        };

        // Agregar producto al carrito
        carritoRopa.push(nuevoProductoRopa);

        // Actualizar la interfaz del carrito 
        actualizarCarritoRopa();
        // Calcular y actualizar el precio total
        calcularTotal();
        // Guardar el carrito en localStorage
        guardarCarrito();
    } else {
        console.error('Error: El contenedor del producto de ropa es undefined.');
    }
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(index) {
    carritoRopa.splice(index, 1); // Eliminar el producto en el índice especificado
    // Actualizar la interfaz del carrito 
    actualizarCarritoRopa();
    // Calcular y actualizar el precio total
    calcularTotal();
    // Guardar el carrito en localStorage
    guardarCarrito();
}

// Función para calcular y actualizar el precio total
function calcularTotal() {
    let total = carritoRopa.reduce((sum, productoRopa) => sum + productoRopa.precio, 0);

    // Total con punto para los miles y coma para los centavos
    let totalFormateado = total.toLocaleString('es-ES', { style: 'currency', currency: 'ARS' });

    document.getElementById('total').textContent = totalFormateado;
}

// Función para cargar el carrito desde localStorage
function cargarCarrito() {
    let carritoGuardado = localStorage.getItem('carritoRopa');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carritoRopa', JSON.stringify(carritoRopa));
}

// Función para actualizar la interfaz del carrito 
function actualizarCarritoRopa() {
    // Obtener el elemento que mostrará la lista de productos en el carrito
    let carritoList = document.getElementById('carrito-list');

    // Limpiar el contenido existente en el carrito
    carritoList.innerHTML = '';

    // Recorrer el carritoRopa y agregar cada producto al carritoList
    carritoRopa.forEach(function (productoRopa) {
        let itemCarrito = document.createElement('li');
        itemCarrito.textContent = `${productoRopa.nombre} - ${productoRopa.precio.toLocaleString('es-ES', { style: 'currency', currency: 'ARS' })}`;

        // Botón para eliminar el producto del carrito
        let btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.addEventListener('click', function () {
            eliminarDelCarrito(carritoRopa.indexOf(productoRopa));
        });

        // Agregar el botón al elemento del carrito
        itemCarrito.appendChild(btnEliminar);

        // Agregar el elemento del carrito al carritoList
        carritoList.appendChild(itemCarrito);
    });
}

// Función para mostrar la ventana emergente del carrito
function mostrarCarrito() {
    document.getElementById('carrito-popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

// Función para cerrar la ventana emergente del carrito
function cerrarCarrito() {
    document.getElementById('carrito-popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// Asignar evento de click al botón "Ver Carrito"
document.getElementById('ver-carrito-btn').addEventListener('click', mostrarCarrito);

// Asignar evento de click al botón "Cerrar Carrito"
document.getElementById('cerrar-carrito-btn').addEventListener('click', cerrarCarrito);

// Asignar evento de click a todos los botones "Agregar al carrito"
let agregarCarritoBtns = document.querySelectorAll('.agregar-carrito-btn');
agregarCarritoBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        agregarAlCarrito(this); 
    });
});

// Asignar evento de click a todos los botones "Eliminar del Carrito"
let eliminarCarritoBtns = document.querySelectorAll('.eliminar-carrito-btn');
eliminarCarritoBtns.forEach(function (btn, index) {
    btn.addEventListener('click', function () {
        eliminarDelCarrito(index);
    });
});

// Función para verificar si el carrito estaba abierto al cargar la página
function verificarEstadoCarrito() {
    let carritoAbierto = localStorage.getItem('carritoAbierto');

    if (carritoAbierto === 'true') {
        mostrarCarrito();
    }
}

// Llamar a la función al cargar la página
verificarEstadoCarrito();
