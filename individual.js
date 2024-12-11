let productosSeleccionados = [];
let convenioSeleccionado = null;

const preciosProductos = {
    "Pecadora": 8,
    "Crispy": 8,
    "The Donut": 8,
    "The Hulk": 8,
    "Super Hot": 8,
    "Chicken wings": 7,
    "Cheese pops": 6,
    "Salad": 6,
    "Chips": 6,
    "Batido de chocolate": 8,
    "Batido de vainilla": 8,
    "Batido de fresa": 8,
    "Soda de cola": 7,
    "Soda de limón": 7,
    "Soda de naranja": 7
};

// Precios de los combos
const preciosCombos = {
    "principal": 70, // Combo principal
    "entrante": 60   // Combo entrante
};

// Descuentos para cada convenio
const descuentosConvenios = {
    "LSPD": { principal: 65, descuentoIndividual: 1 },
    "BENNYS": { principal: 60, entrante: 50, descuentoIndividual: 1 },
    "24/7": { principal: 65, entrante: 55 },
    "STARWALKS": { principal: 65, entrante: 55 },
    "24/7 Especial": { especial: 55 }
};

function agregarProducto(nombre) {
    const precio = preciosProductos[nombre];
    const productoExistente = productosSeleccionados.find(producto => producto.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        productosSeleccionados.push({ nombre, precio, cantidad: 1 });
    }

    actualizarResumen();
}

function actualizarResumen() {
    let resumenHTML = '';
    let total = 0;

    // Contar la cantidad de cada producto
    let productosCount = { 
        "Pecadora": 0, "Crispy": 0, "The Donut": 0, "The Hulk": 0, "Super Hot": 0, 
        "Chicken wings": 0, "Cheese pops": 0, "Salad": 0, "Chips": 0,
        "Batido de chocolate": 0, "Batido de vainilla": 0, "Batido de fresa": 0, 
        "Soda de cola": 0, "Soda de limón": 0, "Soda de naranja": 0
    };

    productosSeleccionados.forEach(producto => {
        productosCount[producto.nombre] += producto.cantidad;
    });

    // Buscar combos de hamburguesas y batidos
    let combosPrincipales = 0;
    let combosEntrantes = 0;

    // Calcular combos principales (hamburguesas + bebidas)
    let cantidadHamburguesas = productosCount["Pecadora"] + productosCount["Crispy"] + productosCount["The Donut"] + productosCount["The Hulk"] + productosCount["Super Hot"];
    let cantidadBebidasPrincipales = productosCount["Batido de fresa"] + productosCount["Batido de vainilla"] + productosCount["Batido de chocolate"] + productosCount["Soda de cola"] + productosCount["Soda de limón"] + productosCount["Soda de naranja"];
    let combosPrincipalesPosibles = Math.min(cantidadHamburguesas, cantidadBebidasPrincipales);
    combosPrincipales = combosPrincipalesPosibles;
    total += combosPrincipales * preciosCombos.principal;

    // Calcular combos entrantes (starters + bebidas)
    let cantidadEntrantes = productosCount["Chicken wings"] + productosCount["Cheese pops"] + productosCount["Salad"] + productosCount["Chips"];
    let cantidadBebidasEntrantes = productosCount["Batido de fresa"] + productosCount["Batido de vainilla"] + productosCount["Batido de chocolate"] + productosCount["Soda de cola"] + productosCount["Soda de limón"] + productosCount["Soda de naranja"];
    let combosEntrantesPosibles = Math.min(cantidadEntrantes, cantidadBebidasEntrantes);
    combosEntrantes = combosEntrantesPosibles;
    total += combosEntrantes * preciosCombos.entrante;

    // Actualizar resumen de productos individuales restantes
    productosSeleccionados.forEach(producto => {
        let cantidadRestante = producto.cantidad;
        // Resta la cantidad de los combos
        if (producto.nombre === "Pecadora" || producto.nombre === "Crispy" || producto.nombre === "The Donut" || producto.nombre === "The Hulk" || producto.nombre === "Super Hot") {
            cantidadRestante -= combosPrincipales;
        }
        if (producto.nombre === "Chicken wings" || producto.nombre === "Cheese pops" || producto.nombre === "Salad" || producto.nombre === "Chips") {
            cantidadRestante -= combosEntrantes;
        }
        if (cantidadRestante > 0) {
            let precioTotal = producto.precio * cantidadRestante;
            total += precioTotal;
            resumenHTML += `${producto.nombre} (x${cantidadRestante}) - $${precioTotal.toFixed(2)} <button onclick="eliminarProducto('${producto.nombre}')">Eliminar</button><br>`;
        }
    });

    // Si hay convenio, ajustar el precio
    if (convenioSeleccionado) {
        aplicarDescuentoConvenio(resumenHTML, total);
    }

    document.getElementById("resumen").innerHTML = resumenHTML;
    document.getElementById("total").innerText = "Total: $" + total.toFixed(2);
}

function eliminarProducto(nombre) {
    productosSeleccionados = productosSeleccionados.filter(producto => producto.nombre !== nombre);
    actualizarResumen();
}

function seleccionarConvenio(convenio) {
    convenioSeleccionado = convenio;
    actualizarResumen();
}

function aplicarDescuentoConvenio(resumenHTML, total) {
    if (convenioSeleccionado) {
        const convenio = descuentosConvenios[convenioSeleccionado];
        if (convenio.descuentoIndividual) {
            total -= productosSeleccionados.length * convenio.descuentoIndividual;
        }
        if (convenio.principal) {
            total -= preciosCombos.principal - convenio.principal;
        }
        if (convenio.entrante) {
            total -= preciosCombos.entrante - convenio.entrante;
        }
        if (convenio.especial) {
            total -= convenio.especial;
        }
    }
}

function registrarPedido() {
    alert("Pedido registrado correctamente!");
    let comentario = "Pedido: ";
    productosSeleccionados.forEach(producto => {
        comentario += `${producto.nombre} (x${producto.cantidad}), `;
    });
    comentario = comentario.slice(0, -2); // Eliminar la coma final
    document.getElementById("comentario-pedido").innerText = comentario;
    document.getElementById("modal-comentario").style.display = "block";
}

function cerrarModal() {
    document.getElementById("modal-comentario").style.display = "none";
}

function copiarComentario() {
    const comentario = document.getElementById("comentario-pedido").innerText;
    navigator.clipboard.writeText(comentario).then(() => {
        alert("Comentario copiado al portapapeles.");
    });
}

// Redireccionar al index.html
function redirigirAIndex() {
    window.location.href = 'index.html';
}
