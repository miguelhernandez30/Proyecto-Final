document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById("modalAgregarCuenta");
    const btnAgregarCuenta = document.getElementById("agregarCuenta");
    const btnCerrar = document.querySelector(".close");
    const temasList = document.getElementById('temas-list');
    const formAgregarCuenta = document.getElementById('formAgregarCuenta');
    const guardarCambiosBtn = document.getElementById('guardarCambios');
    let editingRow = null;

    btnAgregarCuenta.onclick = function () {
        modal.style.display = "block";
    }

    btnCerrar.onclick = function () {
        modal.style.display = "none";
    }

    function agregarCuenta() {
        const numeroCuenta = document.getElementById('numeroCuenta').value;
        const nombreBanco = document.getElementById('nombreBanco').value;
        const tipoCuenta = document.getElementById('tipoCuenta').value;
        const saldoActual = parseFloat(document.getElementById('saldoActual').value);
        const estadoCuenta = document.getElementById('estadoCuenta').value;
        const fechaApertura = document.getElementById('fechaApertura').value;
        const descripcion = document.getElementById('descripcion').value;

        if (editingRow) {
            editingRow.innerHTML = `
                <td>${numeroCuenta}</td>
                <td>${nombreBanco}</td>
                <td>${tipoCuenta}</td>
                <td>${saldoActual}</td>
                <td>${estadoCuenta}</td>
                <td>${fechaApertura}</td>
                <td>${descripcion}</td>
                <td>
                    <button class="btn-editar">Editar</button>
                    <button class="btn-borrar">Borrar</button>
                </td>
            `;
            addRowEventListeners(editingRow);
            editingRow = null;
        } else {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${numeroCuenta}</td>
                <td>${nombreBanco}</td>
                <td>${tipoCuenta}</td>
                <td>${saldoActual}</td>
                <td>${estadoCuenta}</td>
                <td>${fechaApertura}</td>
                <td>${descripcion}</td>
                <td>
                    <button class="btn-editar">Editar</button>
                    <button class="btn-borrar">Borrar</button>
                </td>
            `;
            temasList.appendChild(fila);
            addRowEventListeners(fila);
        }

        modal.style.display = "none";
        formAgregarCuenta.reset();
        guardarCuentas();
    }

    function addRowEventListeners(row) {
        const botonBorrar = row.querySelector('.btn-borrar');
        botonBorrar.addEventListener('click', function () {
            temasList.removeChild(row);
            guardarCuentas();
        });

        const botonEditar = row.querySelector('.btn-editar');
        botonEditar.addEventListener('click', function () {
            editarCuenta(row);
            modal.style.display = "block";
        });
    }

    function editarCuenta(row) {
        editingRow = row;
        document.getElementById('numeroCuenta').value = row.cells[0].innerText;
        document.getElementById('nombreBanco').value = row.cells[1].innerText;
        document.getElementById('tipoCuenta').value = row.cells[2].innerText;
        document.getElementById('saldoActual').value = row.cells[3].innerText;
        document.getElementById('estadoCuenta').value = row.cells[4].innerText;
        document.getElementById('fechaApertura').value = row.cells[5].innerText;
        document.getElementById('descripcion').value = row.cells[6].innerText;
    }

    function guardarCuentas() {
        const filas = document.querySelectorAll('#temas-list tr');
        const cuentas = [];
        const numerosCuentas = [];

        filas.forEach(fila => {
            const cuenta = {
                numeroCuenta: fila.cells[0].innerText,
                nombreBanco: fila.cells[1].innerText,
                tipoCuenta: fila.cells[2].innerText,
                saldoActual: fila.cells[3].innerText,
                estadoCuenta: fila.cells[4].innerText,
                fechaApertura: fila.cells[5].innerText,
                descripcion: fila.cells[6].innerText
            };
            cuentas.push(cuenta);
            numerosCuentas.push(cuenta.numeroCuenta);
        });

        localStorage.setItem('cuentas', JSON.stringify(cuentas));
        localStorage.setItem('numerosCuentas', JSON.stringify(numerosCuentas));

        // Volver a asignar eventos de editar y borrar después de guardar
        filas.forEach(fila => {
            addRowEventListeners(fila);
        });
    }

    formAgregarCuenta.addEventListener('submit', function (event) {
        event.preventDefault();
        agregarCuenta();
    });

    cargarCuentas();
});

function cargarCuentas() {
    const cuentas = JSON.parse(localStorage.getItem('cuentas')) || [];
    const temasList = document.getElementById('temas-list');

    cuentas.forEach(cuenta => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${cuenta.numeroCuenta}</td>
            <td>${cuenta.nombreBanco}</td>
            <td>${cuenta.tipoCuenta}</td>
            <td>${cuenta.saldoActual}</td>
            <td>${cuenta.estadoCuenta}</td>
            <td>${cuenta.fechaApertura}</td>
            <td>${cuenta.descripcion}</td>
            <td>
                <button class="btn-editar">Editar</button>
                <button class="btn-borrar">Borrar</button>
            </td>
        `;
        temasList.appendChild(fila);
        addRowEventListeners(fila);
    });
}
