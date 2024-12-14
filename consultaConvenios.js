// consultaConvenio.js

const convenios = {
    "LSPD_FIB_SAFD_BCSO_SAMS": {
        comboPrincipal: 65,
        descuentoProducto: 1
    },
    "BENNYS": {
        comboPrincipal: 60,
        comboEntrante: 50,
        descuentoProducto: 1
    },
    "24_7_STARWALKS": {
        comboPrincipal: 65,
        comboEntrante: 55
    },
    "24_7_ESPECIAL": {
        comboEspecial: 55
    }
};

// Función para obtener los datos del convenio
function obtenerConvenio(convenio) {
    return convenios[convenio] || {};  // Retorna un objeto vacío si no se encuentra el convenio
}

// Función para calcular el total con el convenio aplicado
function calcularTotalConConvenio(seleccionados, convenioSeleccionado) {
    let total = 0;
    const convenio = obtenerConvenio(convenioSeleccionado);

    // Calculamos el precio de los combos según el convenio seleccionado
    seleccionados.forEach(item => {
        if (item.tipo === 'principal') {
            total += convenio.comboPrincipal || 70;  // Si no hay combo principal, usamos el valor por defecto
        } else if (item.tipo === 'entrante') {
            total += convenio.comboEntrante || 60; // Si no hay combo entrante, usamos el valor por defecto
        } else if (item.tipo === 'especial') {
            total += convenio.comboEspecial || 55; // Para el combo especial
        }
        // Descuento en productos si hay
        if (convenio.descuentoProducto) {
            total -= convenio.descuentoProducto * item.cantidad;
        }
    });

    return total;
}


