// Listas de productos
const productosEntrantes = [
    { nombre: "Chicken Wings", precio: 7 },
    { nombre: "Cheese Pops", precio: 6 },
    { nombre: "Salad", precio: 6 },
    { nombre: "Chips", precio: 6 }
];

const productosPrincipales = [
    { nombre: "Crispy", precio: 8 },
    { nombre: "Pecadora", precio: 8 },
    { nombre: "The Donut", precio: 8 },
    { nombre: "The Hulk", precio: 8 },
    { nombre: "Super Hot", precio: 8 }
];

const bebidas = [
    { nombre: "Batido de Fresa", precio: 8 },
    { nombre: "Batido de Vainilla", precio: 8 },
    { nombre: "Batido de Chocolate", precio: 8 },
    { nombre: "Soda de Cola", precio: 7 },
    { nombre: "Soda de Naranja", precio: 7 },
    { nombre: "Soda de Limón", precio: 7 }
];

// Elementos del DOM
const comboEntranteBtn = document.getElementById("combo-entrante-btn");
const comboPrincipalBtn = document.getElementById("combo-principal-btn");
const productosSection = document.getElementById("productos-section");
const bebidasSection = document.getElementById("bebidas-section");
const productosLista = document.getElementById("productos-list");
const bebidasLista = document.getElementById("bebidas-list");
const closeProductosBtn = document.getElementById("cerrar-productos");
const closeBebidasBtn = document.getElementById("cerrar-bebidas");
const convenioSelect = document.getElementById("convenio");
const pedidoLista = document.getElementById("pedido-list");
const totalCombo = document.getElementById("total-pedido");
const registrarVentaBtn = document.getElementById("registrar-pedido");
const calcularTotalBtn = document.getElementById("calcular-total");

// Variables globales
let tipoCombo = ""; // "entrante" o "principal"
let productoSeleccionado = null;
let bebidaSeleccionada = null;

// Mostrar lista de productos
function mostrarProductos(tipo) {
    productosLista.innerHTML = "";
    const productos = tipo === "entrante" ? productosEntrantes : productosPrincipales;
    productos.forEach((producto) => {
        const button = document.createElement("button");
        button.textContent = producto.nombre;
        button.onclick = () => seleccionarProducto(producto);
        productosLista.appendChild(button);
    });
    productosSection.classList.remove("hidden");
}

// Mostrar lista de bebidas
function mostrarBebidas() {
    bebidasLista.innerHTML = "";
    bebidas.forEach((bebida) => {
        const button = document.createElement("button");
        button.textContent = bebida.nombre;
        button.onclick = () => seleccionarBebida(bebida);
        bebidasLista.appendChild(button);
    });
    bebidasSection.classList.remove("hidden");
}

// Seleccionar producto
function seleccionarProducto(producto) {
    productoSeleccionado = producto;
    productosSection.classList.add("hidden");
    mostrarBebidas();
}

// Seleccionar bebida
function seleccionarBebida(bebida) {
    bebidaSeleccionada = bebida;
    bebidasSection.classList.add("hidden");
    actualizarPedido();
}

// Actualizar el pedido
function actualizarPedido() {
    if (!productoSeleccionado || !bebidaSeleccionada) return;

    const precioCombo = tipoCombo === "entrante" ? 60 : 70;
    let total = precioCombo;

    // Aplicar convenio si corresponde
    const convenio = convenioSelect.value;
    if (convenio === "LSPD") {
        total = tipoCombo === "principal" ? 65 : total;
    } else if (convenio === "BENNYS" && tipoCombo === "entrante") {
        total = 50;
    } else if (convenio === "BENNYS" && tipoCombo === "principal") {
        total = 60;
    } else if (convenio === "24/7" && tipoCombo === "entrante") {
        total = 55;
    } else if (convenio === "24/7" && tipoCombo === "principal") {
        total = 65;
    }

    // Mostrar en el resumen
    pedidoLista.textContent = `Producto: ${productoSeleccionado.nombre} + Bebida: ${bebidaSeleccionada.nombre}`;
    totalCombo.textContent = `Total de la factura: $${total}`;
}

// Registrar venta
function registrarVenta() {
    if (!productoSeleccionado || !bebidaSeleccionada) {
        alert("Por favor selecciona un producto y una bebida antes de registrar la venta.");
        return;
    }
    const resumen = `Producto: ${productoSeleccionado.nombre} + Bebida: ${bebidaSeleccionada.nombre}\nTotal de la factura: $${totalCombo.textContent.split("$")[1]}`;
    alert("Venta registrada:\n" + resumen);
}

// Eventos
comboEntranteBtn.onclick = () => {
    tipoCombo = "entrante";
    mostrarProductos("entrante");
};
comboPrincipalBtn.onclick = () => {
    tipoCombo = "principal";
    mostrarProductos("principal");
};
closeProductosBtn.onclick = () => productosSection.classList.add("hidden");
closeBebidasBtn.onclick = () => bebidasSection.classList.add("hidden");
registrarVentaBtn.onclick = registrarVenta;
calcularTotalBtn.onclick = actualizarPedido;
// Redireccionar al index.html
function redirigirAIndex() {
    window.location.href = 'index.html';
}
