// comboConsultor.js

const COMBO_PRECIOS = {
    principal: 70,
    entrante: 60,
};

const comboItems = {
    principal: ['Pecadora', 'Hulk', 'Crispy', 'Super Hot'],
    entrante: ['Chicken wings', 'Cheese pops', 'Salad', 'Chips']
};

// Función para verificar los combos posibles
function checkCombos(cartItems) {
    let productosSeleccionados = {
        principal: 0,
        entrante: 0
    };

    let bebidasSeleccionadas = 0;

    // Contabilizamos los productos y bebidas
    cartItems.forEach(item => {
        if (comboItems.principal.includes(item.name)) {
            productosSeleccionados.principal += item.quantity;
        }
        if (comboItems.entrante.includes(item.name)) {
            productosSeleccionados.entrante += item.quantity;
        }
        if (item.name.includes('Batido') || item.name.includes('Soda')) {
            bebidasSeleccionadas += item.quantity;
        }
    });

    // Verificamos si los combos son posibles
    const combosDisponibles = [];

    if (productosSeleccionados.principal >= 5 && bebidasSeleccionadas >= 5) {
        combosDisponibles.push({
            combo: 'Principal',
            precio: COMBO_PRECIOS.principal,
            cantidadPrincipal: productosSeleccionados.principal,
            cantidadBebidas: bebidasSeleccionadas
        });
    }

    if (productosSeleccionados.entrante >= 5 && bebidasSeleccionadas >= 5) {
        combosDisponibles.push({
            combo: 'Entrante',
            precio: COMBO_PRECIOS.entrante,
            cantidadEntrante: productosSeleccionados.entrante,
            cantidadBebidas: bebidasSeleccionadas
        });
    }

    return combosDisponibles;
}
