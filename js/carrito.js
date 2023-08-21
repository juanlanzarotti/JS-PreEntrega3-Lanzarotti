document.addEventListener("DOMContentLoaded", function () {
  const carritoProductos = document.getElementById("carritoProductos");
  const btnAddToCart = document.querySelectorAll(".btn-add-to-cart");
  const carritoLink = document.getElementById("carritoLink");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function agregarAlCarrito(nombre, precio, categoria) {
    const productoExistente = carrito.find(
      (producto) =>
        producto.nombre === nombre && producto.categoria === categoria
    );
    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      carrito.push({ nombre, precio, categoria, cantidad: 1 });
    }
    actualizarCarrito();
    actualizarDetalleCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  function eliminarProducto(nombre, categoria) {
    carrito = carrito.filter(
      (producto) =>
        producto.nombre !== nombre || producto.categoria !== categoria
    );
    actualizarCarrito();
    actualizarDetalleCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  function actualizarCarrito() {
    carritoProductos.innerHTML = "";
    let total = 0;

    carrito.forEach((producto) => {
      carritoProductos.innerHTML += `
        <div class="col-md-4 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${producto.nombre}</h5>
              <p class="card-text">$${producto.precio.toFixed(2)} - Cantidad: ${producto.cantidad}</p>
            </div>
          </div>
        </div>
      `;
      total += producto.precio * producto.cantidad;
    });

    const carritoContainer = document.getElementById("carritoContainer");
    carritoContainer.innerHTML = `
    <p>Carrito: ${carrito.length} productos <br> Total: $${total.toFixed(2)} <br> Total con IVA: $${(total * 1.21).toFixed(2)}</p>

    `;
  }

  function actualizarDetalleCarrito() {
    // Código para actualizar la parte del detalle del carrito de compras que arme
  }

  btnAddToCart.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      const nombre = card.querySelector(".card-title").innerText;
      const categoria = card.getAttribute("data-categoria");
      const precioTexto = card.querySelector(".product-price").innerText;
      const precio = parseFloat(precioTexto.replace("$", ""));
      agregarAlCarrito(nombre, precio, categoria);
    });
  });

  actualizarCarrito();
  actualizarDetalleCarrito();

  carritoLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "../pages/carrito.html";
  });


  carritoProductos.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-remove")) {
      const productoNombre = event.target.getAttribute("data-producto");
      const productoCategoria = event.target.getAttribute("data-categoria");
      eliminarProducto(productoNombre, productoCategoria);
      actualizarCarrito();
      actualizarDetalleCarrito();
    }
  });


  function limpiarCarrito() {
    carrito = [];
    actualizarCarrito();
    actualizarDetalleCarrito();
    localStorage.removeItem("carrito");
  }

  const limpiarCarritoIcon = document.getElementById("limpiarCarritoIcon");
  limpiarCarritoIcon.addEventListener("click", () => {
    limpiarCarrito();
  });

  function realizarCompra() {
    if (carrito.length === 0) {
      alert("El carrito está vacío. Debe agregar elementos al carrito antes de realizar una compra.");
      window.location.href = "../pages/productos.html";
      return; // aca busco deterner la funcion si no hay elementos en el carrito, para mejorar la experiencia del usuario
    }
  
    // formula para generar un numero aleatorio de compra para el cliente (random)
    const numeroDeCompra = Math.floor(Math.random() * 1000000) + 1;
  
    // Logica para realizar la compra
    limpiarCarrito();
    alert(`Compra realizada con éxito\nNúmero de compra: ${numeroDeCompra}\n\nLo esperamos pronto!`);
  
    //cuando el usuario termina de comprar, se lo envia a index a los 0.5 segundos
    setTimeout(function () {
      window.location.href = "../index.html";
    }, 500); // 500 milisegundos = 0.5 segundos
  }
  
  const realizarCompraButton = document.getElementById("realizarCompra");
  realizarCompraButton.addEventListener("click", () => {
    realizarCompra();
  });

  function limpiarCarritoCompleto() {
    
    limpiarCarrito();
  }

  const limpiarCarritoCompletoButton = document.getElementById("limpiarCarritoCompleto");
  limpiarCarritoCompletoButton.addEventListener("click", () => {
    limpiarCarritoCompleto();
  });

});
