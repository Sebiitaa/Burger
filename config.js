const preciosProductos = {
    starters: {
        "Chicken wings": 7,
        "Cheese pops": 6,
        "Salad": 6,
        "Chips": 6
    },
    hamburguesas: {
        "Pecadora": 8,
        "Crispy": 8,
        "The Donut": 8,
        "The Hulk": 8,
        "Super Hot": 8
    },
    postres: {
        "Chocookie": 6,
        "Brownie": 6,
        "Conazo": 7
    },
    bebidas: {
        "Batido de chocolate": 8,
        "Batido de vainilla": 8,
        "Batido de fresa": 8,
        "Soda de cola": 7,
        "Soda de limón": 7,
        "Soda de naranja": 7
    }
};

const preciosCombos = {
    principal: 70, // Combo hamburguesas + bebidas
    entrante: 60   // Combo starters + bebidas
};

// Lógica para formar combos
function calcularCombos(productosSeleccionados) {
    let total = 0;
    let combosPrincipales = 0;
    let combosEntrantes = 0;

    // Contar productos
    const conteo = {
        starters: 0,
        hamburguesas: 0,
        bebidas: 0
    };

    for (const producto of productosSeleccionados) {
        if (preciosProductos.starters[producto.nombre]) conteo.starters += producto.cantidad;
        if (preciosProductos.hamburguesas[producto.nombre]) conteo.hamburguesas += producto.cantidad;
        if (preciosProductos.bebidas[producto.nombre]) conteo.bebidas += producto.cantidad;
    }

    // Calcular combos principales
    combosPrincipales = Math.min(conteo.hamburguesas, conteo.bebidas) // Mínimo entre hamburguesas y bebidas
    total += combosPrincipales * preciosCombos.principal ;

    return total;
}
