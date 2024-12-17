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
const pedidoLista = document.getElementById("pedido-list");
const totalCombo = document.getElementById("total-pedido");
const registrarVentaBtn = document.getElementById("registrar-pedido");
const calcularTotalBtn = document.getElementById("calcular-total");
const convenioSelect = document.getElementById("convenio");
const cantidadCombosInput = document.getElementById("cantidad-combos");

let tipoCombo = ""; // "entrante" o "principal"
let combosSeleccionados = []; // Arreglo para almacenar los combos seleccionados

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
    const combo = { producto, bebida: null }; // Crear un combo vacío
    combosSeleccionados.push(combo); // Añadir el combo a la lista de combos seleccionados
    productosSection.classList.add("hidden");
    mostrarBebidas();
}

// Seleccionar bebida
function seleccionarBebida(bebida) {
    const ultimoCombo = combosSeleccionados[combosSeleccionados.length - 1];
    if (ultimoCombo) {
        ultimoCombo.bebida = bebida; // Asignar bebida al último combo seleccionado
    }
    bebidasSection.classList.add("hidden");
    actualizarPedido();
}

// Actualizar el pedido
function actualizarPedido() {
    pedidoLista.innerHTML = ""; // Limpiar la lista de pedidos
    let total = 0;

    // Iterar sobre los combos seleccionados y mostrar detalles
    combosSeleccionados.forEach((combo, index) => {
        if (combo.producto && combo.bebida) {
            const cantidadCombos = parseInt(cantidadCombosInput.value) || 1;
            let precioCombo = tipoCombo === "entrante" ? 60 : 70;

            // Aplicar convenio si corresponde
            const convenio = convenioSelect.value;
            if (convenio === "LSPD") {
                precioCombo = tipoCombo === "principal" ? 65 : precioCombo;
            } else if (convenio === "BENNYS" && tipoCombo === "entrante") {
                precioCombo = 50;
            } else if (convenio === "BENNYS" && tipoCombo === "principal") {
                precioCombo = 60;
            } else if (convenio === "24/7" && tipoCombo === "entrante") {
                precioCombo = 55;
            } else if (convenio === "24/7" && tipoCombo === "principal") {
                precioCombo = 65;
            }

            // Mostrar el combo en el resumen
            total += precioCombo * cantidadCombos;
            const comboDiv = document.createElement("div");
            comboDiv.textContent = `Combo ${index + 1}: ${combo.producto.nombre} + ${combo.bebida.nombre} x ${cantidadCombos} combos`;
            const borrarBtn = document.createElement("button");
            borrarBtn.textContent = "Eliminar";
            borrarBtn.onclick = () => eliminarCombo(index); // Función para eliminar el combo
            comboDiv.appendChild(borrarBtn);
            pedidoLista.appendChild(comboDiv);
        }
    });

    // Mostrar el total
    totalCombo.textContent = `Total de la factura: $${total}`;
}

// Eliminar combo
function eliminarCombo(index) {
    combosSeleccionados.splice(index, 1); // Eliminar el combo de la lista
    actualizarPedido(); // Actualizar la vista del pedido
}

// Registrar venta
function registrarVenta() {
    if (combosSeleccionados.length === 0) {
        alert("Por favor selecciona al menos un combo antes de registrar la venta.");
        return;
    }
    let resumen = "";
    combosSeleccionados.forEach((combo, index) => {
        resumen += `Combo ${index + 1}: ${combo.producto.nombre} + ${combo.bebida.nombre}\n`;
    });
    resumen += `Total de la factura: $${totalCombo.textContent.split("$")[1]}`;
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
calcularTotalBtn.onclick = actualizarPedido;
registrarVentaBtn.onclick = registrarVenta;

// Redireccionar al index.html
function redirigirAIndex() {
    window.location.href = "index.html";
}
