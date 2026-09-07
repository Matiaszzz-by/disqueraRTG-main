var carrito = [];
var planSeleccionadoModal = null;

document.addEventListener('DOMContentLoaded', function () {

  // 1. Manejar clics en los botones "Agregar al Carrito" directamente en la tarjeta
  var botones = document.getElementsByClassName('btn-agregar');
  for (var i = 0; i < botones.length; i++) {
    botones[i].addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation(); // Evita que se abra el modal al presionar solo el botón

      var botonPresionado = event.currentTarget;
      var nombre = botonPresionado.getAttribute('data-nombre');
      var precio = parseFloat(botonPresionado.getAttribute('data-precio'));

      agregarAlCarrito(nombre, precio);
    });
  }

  // 2. Botón para pagar
  var btnPagar = document.getElementById('btn-pagar');
  if (btnPagar) {
    btnPagar.addEventListener('click', function () {
      procesarPagoConsola();
    });
  }

  // 3. Botón para agregar producto desde el modal ampliado
  var btnAgregarModal = document.getElementById('btnAgregarDesdeModal');
  if (btnAgregarModal) {
    btnAgregarModal.addEventListener('click', function () {
      if (planSeleccionadoModal) {
        agregarAlCarrito(planSeleccionadoModal.nombre, planSeleccionadoModal.precio);
      }
    });
  }
});

// Llena la información del modal antes de que Bootstrap lo abra
function prepararModal(nombre, precio, imagenSrc, descripcion) {
  planSeleccionadoModal = { nombre: nombre, precio: parseFloat(precio) };

  document.getElementById('detalleTitulo').innerText = nombre;
  document.getElementById('detalleImagen').src = imagenSrc;
  document.getElementById('detalleDescripcion').innerText = descripcion;
  document.getElementById('detallePrecio').innerText = 'Valor: $' + parseFloat(precio).toFixed(2) + ' USD';
}

function agregarAlCarrito(nombre, precio) {
  var producto = { nombre: nombre, precio: precio };
  carrito.push(producto);
  actualizarCarritoUI();
}

function eliminarDelCarrito(indice) {
  carrito.splice(indice, 1);
  actualizarCarritoUI();
}

function actualizarCarritoUI() {
  var listaCarrito = document.getElementById('lista-carrito');
  var cartCount = document.getElementById('cart-count');
  var totalCarrito = document.getElementById('total-carrito');

  if (!listaCarrito || !cartCount || !totalCarrito) return;

  listaCarrito.innerHTML = '';
  var total = 0;

  if (carrito.length === 0) {
    listaCarrito.innerHTML = '<li class="list-group-item bg-transparent text-light border-secondary">El carrito está vacío</li>';
  } else {
    for (var j = 0; j < carrito.length; j++) {
      total = total + carrito[j].precio;
      listaCarrito.innerHTML += 
        '<li class="list-group-item bg-transparent text-light d-flex justify-content-between align-items-center border-secondary">' +
          '<span>' + carrito[j].nombre + ' - $' + carrito[j].precio.toFixed(2) + ' USD</span>' +
          '<button type="button" class="btn btn-sm btn-outline-danger" onclick="eliminarDelCarrito(' + j + ')">Eliminar</button>' +
        '</li>';
    }
  }

  cartCount.textContent = carrito.length;
  totalCarrito.textContent = total.toFixed(2);
}

function procesarPagoConsola() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  var total = 0;
  console.log("==========================================");
  console.log("RESUMEN DE COMPRA - THE REYES RECORDS");
  console.log("==========================================");

  for (var k = 0; k < carrito.length; k++) {
    total = total + carrito[k].precio;
    console.log((k + 1) + ". " + carrito[k].nombre + " - $" + carrito[k].precio.toFixed(2) + " USD");
  }

  console.log("------------------------------------------");
  console.log("TOTAL A PAGAR: $" + total.toFixed(2) + " USD");
  console.log("==========================================");

  alert("¡Pago procesado con éxito! Revisa la consola (F12) para ver el desglose.");
}