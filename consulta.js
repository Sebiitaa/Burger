function calcularCombos(cartItems) {
    console.log(`Calculando combos...`);  // Log para depurar

    const COMBO_PRECIOS = {
        principal: 70,   // Precio del combo principal (5 hamburguesas + 5 bebidas)
        entrante: 60,    // Precio del combo entrante (5 starters + 5 bebidas)
        postre: 60       // Precio del combo de postres (5 postres + 5 bebidas)
    };

    const PRODUCTO_PRECIOS = {
        'Pecadora': 8,
        'The Hulk': 8,
        'Crispy': 8,
        'Super Hot': 8,
        'The Donut': 8,
        'Chicken Wings': 7,
        'Cheese Pops': 6,
        'Salad': 6,
        'Chips': 6,
        'Chocookie': 6,
        'Brownie': 6,
        'Conazo': 7,
        'Batido Fresa': 8,
        'Batido Vainilla': 8,
        'Batido de Chocolate': 8,
        'Soda de Cola': 7,
        'Soda de Naranja': 7,
        'Soda de Limón': 7
    };

    let productosPrincipales = [];
    let productosEntrantes = [];
    let productosPostres = [];
    let bebidas = [];
    let total = 0;
    let detallesFactura = [];

    // Clasificar productos en principales, entrantes, postres y bebidas
    cartItems.forEach(item => {
        if (['Pecadora', 'The Hulk', 'Crispy', 'Super Hot', 'The Donut'].includes(item.name)) {
            productosPrincipales.push({ name: item.name, quantity: item.quantity });
        } else if (['Chicken Wings', 'Cheese Pops', 'Salad', 'Chips'].includes(item.name)) {
            productosEntrantes.push({ name: item.name, quantity: item.quantity });
        } else if (['Chocookie', 'Brownie', 'Conazo'].includes(item.name)) {
            productosPostres.push({ name: item.name, quantity: item.quantity });
        } else if (['Batido Fresa', 'Batido Vainilla', 'Batido de Chocolate', 'Soda de Cola', 'Soda de Naranja', 'Soda de Limón'].includes(item.name)) {
            bebidas.push({ name: item.name, quantity: item.quantity });
        }
    });

    // Función para calcular los combos de un tipo (principal, entrante o postre)
    function calcularCombosDeTipo(productos, bebidas, comboPrecio, comboCantidad) {
        let totalCombos = 0;
        let totalProductos = productos.reduce((sum, p) => sum + p.quantity, 0);
        let totalBebidas = bebidas.reduce((sum, b) => sum + b.quantity, 0);

        // Calcular cuántos combos podemos hacer
        let combos = Math.min(
            Math.floor(totalProductos / comboCantidad),
            Math.floor(totalBebidas / comboCantidad)
        );
        totalCombos += combos * comboPrecio;

        // Descontar productos y bebidas que ya fueron usados para formar los combos
        let productosRestantes = descontarProductos(productos, combos * comboCantidad);
        let bebidasRestantes = descontarProductos(bebidas, combos * comboCantidad);

        return {
            totalCombos,
            productosRestantes,
            bebidasRestantes
        };
    }

    // Función para descontar la cantidad de productos
    function descontarProductos(items, cantidad) {
        let restante = cantidad;
        return items.map(item => {
            if (restante === 0) return item;
            let descontado = Math.min(item.quantity, restante);
            restante -= descontado;
            return { ...item, quantity: item.quantity - descontado };
        }).filter(item => item.quantity > 0);
    }

    // Calcular combos principales, entrantes y postres
    const resultadoPrincipal = calcularCombosDeTipo(productosPrincipales, bebidas, COMBO_PRECIOS.principal, 5);
    total += resultadoPrincipal.totalCombos;

    const resultadoEntrante = calcularCombosDeTipo(productosEntrantes, resultadoPrincipal.bebidasRestantes, COMBO_PRECIOS.entrante, 5);
    total += resultadoEntrante.totalCombos;

    const resultadoPostre = calcularCombosDeTipo(productosPostres, resultadoEntrante.bebidasRestantes, COMBO_PRECIOS.postre, 5);
    total += resultadoPostre.totalCombos;

    // Combina los productos restantes de todos los combos
    const productosRestantes = [
        ...resultadoPrincipal.productosRestantes,
        ...resultadoEntrante.productosRestantes,
        ...resultadoPostre.productosRestantes
    ];
    const bebidasRestantes = resultadoPostre.bebidasRestantes;

    // Calcular el total de los productos restantes
    productosRestantes.forEach(item => {
        let precioUnitario = PRODUCTO_PRECIOS[item.name];
        total += item.quantity * precioUnitario;

        detallesFactura.push(`${item.quantity}x ${item.name} - $${(item.quantity * precioUnitario).toFixed(2)}`);
    });

    bebidasRestantes.forEach(item => {
        let precioUnitario = PRODUCTO_PRECIOS[item.name];
        total += item.quantity * precioUnitario;
        detallesFactura.push(`${item.quantity}x ${item.name} - $${(item.quantity * precioUnitario).toFixed(2)}`);
    });

    // Actualizar el total en el HTML
    document.getElementById('total').textContent = `Total de factura: $${total.toFixed(2)}`;

    return detallesFactura;
}
