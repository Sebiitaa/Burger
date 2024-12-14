// Función para calcular los combos y los productos individuales
function calcularCombos(cartItems) {
    const COMBO_PRECIOS = {
        principal: 70,   // Precio del combo principal (5 hamburguesas + 5 bebidas)
        entrante: 60     // Precio del combo entrante (5 starters + 5 bebidas)
    };

    // Precios de los productos
    const PRODUCTO_PRECIOS = {
        'Pecadora': 8,
        'Hulk': 8,
        'Crispy': 8,
        'Super Hot': 8,
        'Chicken wings': 6,
        'Cheese pops': 6,
        'Salad': 6,
        'Chips': 6,
        'Chocookie': 6,
        'Brownie': 6,
        'Conazo': 7,
        'Batido de fresa': 8,
        'Batido de vainilla': 8,
        'Batido de chocolate': 8,
        'Soda de cola': 7,
        'Soda de naranja': 7,
        'Soda de limón': 7
    };

    // Contadores de productos y bebidas
    let productosSeleccionados = {
        principal: 0,
        entrante: 0
    };
    let bebidasSeleccionadas = 0;

    // Lista de productos que forman combos
    const comboItems = {
        principal: ['Pecadora', 'Hulk', 'Crispy', 'Super Hot'],
        entrante: ['Chicken wings', 'Cheese pops', 'Salad', 'Chips']
    };

    // Contabilizamos productos y bebidas
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

    // Calcular el total de combos y productos individuales
    let total = 0;

    // Verificar combos de 5 para productos principales y bebidas
    const principalCombos = Math.min(
        Math.floor(productosSeleccionados.principal / 5),
        Math.floor(bebidasSeleccionadas / 5)
    );
    total += principalCombos * COMBO_PRECIOS.principal;
    productosSeleccionados.principal -= principalCombos * 5;
    bebidasSeleccionadas -= principalCombos * 5;

    // Verificar combos de 5 para productos entrantes y bebidas
    const entranteCombos = Math.min(
        Math.floor(productosSeleccionados.entrante / 5),
        Math.floor(bebidasSeleccionadas / 5)
    );
    total += entranteCombos * COMBO_PRECIOS.entrante;
    productosSeleccionados.entrante -= entranteCombos * 5;
    bebidasSeleccionadas -= entranteCombos * 5;

    // Sumar productos principales restantes
    total += productosSeleccionados.principal * PRODUCTO_PRECIOS['Pecadora']; // Precio de hamburguesas

    // Sumar productos entrantes restantes
    total += productosSeleccionados.entrante * PRODUCTO_PRECIOS['Chicken wings']; // Precio de starters

    // Sumar bebidas restantes
    total += bebidasSeleccionadas * PRODUCTO_PRECIOS['Soda de cola']; // Precio genérico de bebidas

    // Mostrar el total calculado
    const totalElement = document.getElementById('total');
    totalElement.innerHTML = `Total de factura: $${total.toFixed(2)}`;
}


