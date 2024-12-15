fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((json) => console.log(json));

document.addEventListener("DOMContentLoaded", () => {
  const productosContainer = document.querySelector(
    ".productos .container .d-flex"
  );

  const obtenerProductos = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((productos) => {
        const productosLimitados = productos.slice(0, 18);

        productosContainer.innerHTML = "";
        productosLimitados.forEach((producto) => {
          const productoCard = `
                  <div class="card m-2" style="width: 300px;">
                    <img src="${producto.image}" class="card-img-top" alt="${
            producto.title
          }" style="object-fit: contain; height: 180px; padding: 15px;">
                    <div class="card-body">
                      <h5 class="card-title text-truncate">${
                        producto.title
                      }</h5>
                      <p class="card-text text-truncate">${
                        producto.description
                      }</p>
                      <div class="d-flex justify-content-between align-items-center">
                        <span class="h4 text-primary mb-0">$${producto.price.toFixed(
                          2
                        )}</span>
                        <button class="btn btn-outline-primary btn-sm" onclick="agregarAlCarrito(${
                          producto.id
                        }, '${producto.title}', ${producto.price}, '${
            producto.image
          }')">
                          <i class="fas fa-shopping-cart me-2"></i>Agregar
                        </button>
                      </div>
                      <button class="btn btn-link mt-2" data-bs-toggle="modal" data-bs-target="#verMasModal" onclick="verMas('${
                        producto.description
                      }')">Ver más <i class="fas fa-plus me-2"></i></button>
                    </div>
                  </div>
                `;
          productosContainer.innerHTML += productoCard;
        });
      })
      .catch((error) => {
        console.error("Error al cargar los productos:", error);
      });
  };

  obtenerProductos();
});

const verMas = (descripcion) => {
  const modalDescripcion = document.getElementById("modalDescripcion");
  modalDescripcion.textContent = descripcion;
};

const agregarAlCarrito = (id, title, price, image) => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const productoExistente = carrito.find((producto) => producto.id === id);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ id, title, price, image, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  const toast = new bootstrap.Toast(document.getElementById("toast"), {
    delay: 1500,
  });
  toast.show();
};
