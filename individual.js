let cartItems = [];
let accumulatedSummary = "";

// Precios de los combos
const COMBO_PRECIOS = {
    principal: 70,
    entrante: 60,
};

// Función para actualizar el carrito
function updateCart() {
    const productList = document.getElementById('product-list');
    const totalElement = document.getElementById('total');
    productList.innerHTML = ''; // Limpiar lista de productos
    let total = 0;

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
        const li = document.createElement('li');
        li.innerHTML = `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
                        <button class="product-remove" data-product="${item.name}">Eliminar</button>`;
        productList.appendChild(li);

        // Contabilizamos bebidas
        if (item.name in comboItems) {
            if (comboItems.principal.includes(item.name)) {
                productosSeleccionados.principal += item.quantity;
            }
            if (comboItems.entrante.includes(item.name)) {
                productosSeleccionados.entrante += item.quantity;
            }
        }

        // Contabilizamos las bebidas
        if (item.name.includes('Batido') || item.name.includes('Soda')) {
            bebidasSeleccionadas += item.quantity;
        }

        total += item.price * item.quantity; // Sumar el precio actualizado del producto

        // Agregar funcionalidad de eliminar por unidad
        const removeButton = li.querySelector('.product-remove');
        removeButton.addEventListener('click', () => {
            removeProduct(item.name);
        });
    });

    // Detectamos combos
    if (productosSeleccionados.principal >= 5 && bebidasSeleccionadas >= 5) {
        total -= productosSeleccionados.principal * 8; // Restar precio individual
        total += COMBO_PRECIOS.principal; // Aplicar precio del combo principal
    }

    if (productosSeleccionados.entrante >= 5 && bebidasSeleccionadas >= 5) {
        total -= productosSeleccionados.entrante * 6; // Restar precio individual
        total += COMBO_PRECIOS.entrante; // Aplicar precio del combo entrante
    }

    // Mostrar el total de la factura
    totalElement.innerHTML = `Total de factura: $${total.toFixed(2)}`; // Mostrar el total correcto con dos decimales
}

// Función para eliminar un producto del carrito
function removeProduct(productName) {
    const index = cartItems.findIndex(item => item.name === productName);
    if (index !== -1) {
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity--; // Reducir cantidad en lugar de eliminar el producto
        } else {
            cartItems.splice(index, 1); // Eliminar el producto si la cantidad es 1
        }
        updateCart();
    }
}

// Función para agregar productos al carrito
const productButtons = document.querySelectorAll('.product-button');
productButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productInfo = button.getAttribute('data-product');
        const [name, price] = productInfo.split(' - ');
        const priceValue = parseFloat(price.replace('$', ''));

        const existingProduct = cartItems.find(item => item.name === name);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cartItems.push({ name, price: priceValue, quantity: 1 });
        }

        updateCart();
    });
});

// Funciones para manejar modales
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal(modal) {
    modal.style.display = 'none';
}

const menuButtons = document.querySelectorAll('.menu-button');
menuButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        openModal(modalId);
    });
});

const closeButtons = document.querySelectorAll('.close');
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

// Función para registrar la compra
document.getElementById('register-button').addEventListener('click', () => {
    let summary = "Resumen de la compra:\n";
    cartItems.forEach(item => {
        summary += `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
    });

    accumulatedSummary += summary; // Acumular el resumen de compras

    // Mostrar comentario automáticamente
    const commentText = document.getElementById('comment-text');
    commentText.value = accumulatedSummary;

    const modalComment = document.getElementById('modal-comment');
    openModal('modal-comment');
});

// Función para copiar el comentario al portapapeles
document.getElementById('copy-comment').addEventListener('click', () => {
    const commentText = document.getElementById('comment-text');
    commentText.select();
    document.execCommand('copy');
});

// Función para descargar el resumen de la compra en un archivo TXT
document.getElementById('download-all-button').addEventListener('click', () => {
    const blob = new Blob([accumulatedSummary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'compra_resumen.txt';
    link.click();
});

// Agregar el evento al botón de calcular combo
document.getElementById('calculate-combo').addEventListener('click', () => {
    // Pasamos la información del carrito a consulta.js para calcular los combos
    calcularCombos(cartItems);
});

// Nueva función para manejar la lógica del combo
function calcularCombos(cartItems) {
    let totalCombos = 0;
    let comboDetails = '';

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

    // Comprobamos y calculamos los combos
    if (productosSeleccionados.principal >= 5 && bebidasSeleccionadas >= 5) {
        totalCombos += COMBO_PRECIOS.principal;
        comboDetails += `Combo Principal: 5 productos + 5 bebidas - $${COMBO_PRECIOS.principal}\n`;
    }

    if (productosSeleccionados.entrante >= 5 && bebidasSeleccionadas >= 5) {
        totalCombos += COMBO_PRECIOS.entrante;
        comboDetails += `Combo Entrante: 5 productos + 5 bebidas - $${COMBO_PRECIOS.entrante}\n`;
    }

    // Mostrar los combos y el total
    const commentText = document.getElementById('comment-text');
    commentText.value = comboDetails;

    alert(`Total de Combos: $${totalCombos}`);
}
// Función para redirigir al usuario a la página de inicio (index.html)
function regresarAlInicio() {
    window.location.href = 'index.html';  // Redirige al archivo index.html
}
