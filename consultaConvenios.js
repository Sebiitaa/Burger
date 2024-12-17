// Función para aplicar el convenio seleccionado
document.getElementById("apply-convenio").addEventListener("click", () => {
    const convenioSeleccionado = document.getElementById("convenio-select").value;
    const cartItems = obtenerProductosDelCarrito(); // Función para extraer productos del carrito
    const totalInicial = calcularTotalInicial(cartItems); // Calcula el total antes de aplicar convenio

    const resultado = aplicarConvenio(totalInicial, cartItems, convenioSeleccionado);

    // Actualizar el total en la interfaz
    document.getElementById("total").textContent = `Total de factura: $${resultado.totalAjustado.toFixed(2)}`;
});

// Función principal para aplicar convenios
function aplicarConvenio(total, cartItems, convenio) {
    const ajustes = {
        LSPD_FIB_SAFD_BCSO_SAMS: { descuentoIndividual: 1, comboPrincipal: 65 },
        BENNYS: { descuentoIndividual: 1, comboPrincipal: 60, comboEntrante: 50 },
        "24/7 y STARWALKS": { comboPrincipal: 65, comboEntrante: 55 },
        "24/7_ESPECIAL": { comboEspecial: 55 },
        NO: {},
    };

    const ajuste = ajustes[convenio];
    if (!ajuste) throw new Error(`Convenio no válido: ${convenio}`);

    let totalDescuento = 0;
    let totalAjustado = total;

    // Aplicar descuento a productos individuales
    if (ajuste.descuentoIndividual) {
        cartItems.forEach(item => {
            if (!item.esParteDeCombo) {
                totalDescuento += ajuste.descuentoIndividual * item.quantity;
            }
        });
    }

    // Detectar y ajustar combos
    let numCombosPrincipal = 0, numCombosEntrante = 0, numCombosEspecial = 0;
    cartItems.forEach(item => {
        if (item.tipo === "principal") numCombosPrincipal += item.quantity;
        if (item.tipo === "entrante") numCombosEntrante += item.quantity;
        if (item.tipo === "especial") numCombosEspecial += item.quantity;
    });

    numCombosPrincipal = Math.floor(numCombosPrincipal / 5);
    numCombosEntrante = Math.floor(numCombosEntrante / 5);
    numCombosEspecial = Math.floor(numCombosEspecial / 5);

    if (ajuste.comboPrincipal) {
        totalAjustado -= numCombosPrincipal * 70;
        totalAjustado += numCombosPrincipal * ajuste.comboPrincipal;
    }

    if (ajuste.comboEntrante) {
        totalAjustado -= numCombosEntrante * 60;
        totalAjustado += numCombosEntrante * ajuste.comboEntrante;
    }

    if (ajuste.comboEspecial) {
        totalAjustado -= numCombosEspecial * 55;
        totalAjustado += numCombosEspecial * ajuste.comboEspecial;
    }

    totalAjustado -= totalDescuento;

    return {
        totalAjustado,
    };
}

// Función para obtener los productos del carrito
function obtenerProductosDelCarrito() {
    const productList = document.getElementById("product-list");
    const items = [];

    productList.querySelectorAll("li").forEach(li => {
        const [nombre, cantidadTexto] = li.textContent.split(" x ");
        const quantity = parseInt(cantidadTexto);
        const tipo = determinarTipoProducto(nombre); // Determinar el tipo del producto

        items.push({
            nombre,
            quantity,
            tipo,
            esParteDeCombo: false, // Ajustar lógica si se detectan combos
        });
    });

    return items;
}

// Función para calcular el total inicial
function calcularTotalInicial(cartItems) {
    return cartItems.reduce((total, item) => {
        const precio = obtenerPrecioProducto(item.nombre);
        return total + precio * item.quantity;
    }, 0);
}

// Función para determinar el tipo de producto
function determinarTipoProducto(nombre) {
    if (nombre.includes("Crispy") || nombre.includes("Hot")) return "principal";
    if (nombre.includes("Wings") || nombre.includes("Pops")) return "entrante";
    if (nombre.includes("Cookie") || nombre.includes("Brownie")) return "especial";
    return "individual";
}

// Función para obtener el precio del producto según el nombre
function obtenerPrecioProducto(nombre) {
    const precios = {
        "Chicken Wings": 7,
        "Cheese Pops": 6,
        "Salad": 6,
        "Chips": 6,
        "Crispy": 8,
        "Pecadora": 8,
        "The Donut": 8,
        "The Hulk": 8,
        "Super Hot": 8,
        "Chocookie": 6,
        "Brownie": 6,
        "Conazo": 7,
        "Batido Fresa": 8,
        "Batido Vainilla": 8,
        "Batido Chocolate": 8,
        "Soda de Cola": 7,
        "Soda de Naranja": 7,
        "Soda de Limón": 7,
    };
    return precios[nombre] || 0;
}
