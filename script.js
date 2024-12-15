const selectServicio = document.getElementById('servicio');
const checkboxSoporte = document.getElementById('soporte');
const checkboxIntegracion = document.getElementById('integracion');
const inputEmpleados = document.getElementById('empleados');
const botonCalcular = document.getElementById('calcular');
const botonReiniciar = document.querySelector('button[type="reset"]');
const mostrarCostoTotal = document.getElementById('costo-total');
const mostrarDesglose = document.getElementById('desglose');
const divResultado = document.getElementById('resultado');

function calcularCosto(event) {
  
    event.preventDefault();

    const servicioSeleccionado = selectServicio.options[selectServicio.selectedIndex];
    const costoServicio = parseFloat(servicioSeleccionado.dataset.costo);
    const costoSoporte = checkboxSoporte.checked ? parseFloat(checkboxSoporte.value) : 0;
    const costoIntegracion = checkboxIntegracion.checked ? parseFloat(checkboxIntegracion.value) : 0;
    const cantidadEmpleados = Math.max(1, parseInt(inputEmpleados.value, 10));
    const costoEmpleados = cantidadEmpleados * 10;
    const costoTotal = costoServicio + costoSoporte + costoIntegracion + costoEmpleados;

    let desgloseHTML = '';
    if (costoServicio > 0) {
        desgloseHTML += `<li>Costo del servicio: $${costoServicio.toFixed(2)}</li>`;
    }
    if (costoSoporte > 0) {
        desgloseHTML += `<li>Soporte técnico: $${costoSoporte.toFixed(2)}</li>`;
    }
    if (costoIntegracion > 0) {
        desgloseHTML += `<li>Integración con sistemas: $${costoIntegracion.toFixed(2)}</li>`;
    }
    if (costoEmpleados > 0) {
        desgloseHTML += `<li>Costo por empleados (${cantidadEmpleados} empleados): $${costoEmpleados.toFixed(2)}</li>`;
    }

    mostrarDesglose.innerHTML = `<ul>${desgloseHTML}</ul>`;
    mostrarCostoTotal.textContent = costoTotal.toFixed(2);
    divResultado.style.display = 'block';
}

function reiniciarCalculadora() {
    divResultado.style.display = 'none';
    mostrarDesglose.innerHTML = '';
    mostrarCostoTotal.textContent = '';
}

botonCalcular.addEventListener('click', calcularCosto);
botonReiniciar.addEventListener('click', reiniciarCalculadora);
