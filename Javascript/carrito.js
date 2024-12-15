
const cargarCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.getElementById('carrito-container');
    carritoContainer.innerHTML = ''; 
    let total = 0;

    carrito.forEach(producto => {
        const productoCard = `
            <div class="carrito-card">
                <img src="${producto.image}" alt="${producto.title}">
                <div class="carrito-card-body">
                    <h5 class="carrito-card-title">${producto.title}</h5>
                    <p class="carrito-card-text">Precio: $${producto.price.toFixed(2)}</p>
                    <p class="carrito-card-text">Cantidad: <span id="cantidad-${producto.id}">${producto.cantidad}</span></p>
                    <button class="carrito-btn btn btn-primary" onclick="cambiarCantidad(${producto.id}, 1)">+</button>
                    <button class="carrito-btn btn btn-danger" onclick="cambiarCantidad(${producto.id}, -1)">-</button>
                    <button class="carrito-btn btn btn-danger" onclick="eliminarProducto(${producto.id})">Eliminar</button>
                </div>
            </div>
        `;
        carritoContainer.innerHTML += productoCard;
        total += producto.price * producto.cantidad;
    });

    
    const totalElement = document.getElementById('total');
    totalElement.textContent = total.toFixed(2);
};


window.cambiarCantidad = (id, cambio) => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = carrito.find(p => p.id === id);

    if (producto) {
        producto.cantidad += cambio;
        if (producto.cantidad <= 0) {
            carrito = carrito.filter(p => p.id !== id);
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        cargarCarrito(); 
    }
};


window.eliminarProducto = (id) => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(p => p.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito(); 
};


document.addEventListener('DOMContentLoaded', cargarCarrito);


function mostrarModalFinalizacion() {

  const modal = document.createElement('div');
  modal.id = 'modalFinalizacion';
  modal.classList.add('modal', 'fade', 'show');
  modal.style.display = 'block';
  modal.setAttribute('tabindex', '-1');
  modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.zIndex = '1050';

  
  modal.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title">Finalizar Compra</h5>
                  <button type="button" class="btn-close" onclick="cerrarModal()"></button>
              </div>
              <div class="modal-body text-center">
                  <p>Para finalizar su compra, escanee el siguiente código QR:</p>
                  <img src="../img/qr.png" alt="Código QR de Pago" 
                       style="max-width: 250px; margin: 20px auto;">
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" onclick="cerrarModal()">Cerrar</button>
              </div>
          </div>
      </div>
  `;


  document.body.appendChild(modal);
}


function cerrarModal() {
  const modal = document.getElementById('modalFinalizacion');
  if (modal) {
      modal.remove();
  }
}


document.querySelector('.btn-primary').addEventListener('click', mostrarModalFinalizacion);


document.addEventListener('click', function(event) {
  const modal = document.getElementById('modalFinalizacion');
  if (modal && event.target === modal) {
      cerrarModal();
  }
});