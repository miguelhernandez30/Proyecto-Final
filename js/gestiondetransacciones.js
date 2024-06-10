document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById("modalAgregarTransaccion");
    const btnAgregarTransaccion = document.getElementById("agregarTransaccion");
    const btnCerrar = document.querySelector(".close");
    const transaccionesList = document.getElementById('transacciones-list');
    const formAgregarTransaccion = document.getElementById('formAgregarTransaccion');
    let editingRow = null;

    btnAgregarTransaccion.onclick = function () {
        modal.style.display = "block";
    }

    btnCerrar.onclick = function () {
        modal.style.display = "none";   
    }
    

    function agregarTransaccion() {
        const tipoTransaccion = document.getElementById('tipoTransaccion').value;
        const tipoIngresoEgreso = document.getElementById('tipoIngresoEgreso').value;
        const valor = parseFloat(document.getElementById('valor').value);
        const cuentaBancaria = document.getElementById('cuentaBancaria').value;
        const fechaTransaccion = document.getElementById('fechaTransaccion').value;
        const descripcion = document.getElementById('descripcion').value;
        const adjunto = document.getElementById('adjunto').value;

        if (editingRow) {
            editingRow.innerHTML = `
                <td>${tipoTransaccion}</td>
                <td>${tipoIngresoEgreso}</td>
                <td>${valor}</td>
                <td>${cuentaBancaria}</td>
                <td>${fechaTransaccion}</td>
                <td>${descripcion}</td>
                <td>${adjunto}</td>
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
                <td>${tipoTransaccion}</td>
                <td>${tipoIngresoEgreso}</td>
                <td>${valor}</td>
                <td>${cuentaBancaria}</td>
                <td>${fechaTransaccion}</td>
                <td>${descripcion}</td>
                <td>${adjunto}</td>
                <td>
                    <button class="btn-editar">Editar</button>
                    <button class="btn-borrar">Borrar</button>
                </td>
            `;
            transaccionesList.appendChild(fila);
            addRowEventListeners(fila);
        }

        modal.style.display = "none";
        formAgregarTransaccion.reset();
        guardarTransacciones();
    }

    function addRowEventListeners(row) {
        const botonBorrar = row.querySelector('.btn-borrar');
        botonBorrar.addEventListener('click', function () {
            transaccionesList.removeChild(row);
            guardarTransacciones();
        });

        const botonEditar = row.querySelector('.btn-editar');
        botonEditar.addEventListener('click', function () {
            editarTransaccion(row);
            modal.style.display = "block";
        });
    }

    function editarTransaccion(row) {
        editingRow = row;
        document.getElementById('tipoTransaccion').value = row.cells[0].innerText;
        document.getElementById('tipoIngresoEgreso').value = row.cells[1].innerText;
        document.getElementById('valor').value = row.cells[2].innerText;
        document.getElementById('cuentaBancaria').value = row.cells[3].innerText;
        document.getElementById('fechaTransaccion').value = row.cells[4].innerText;
        document.getElementById('descripcion').value = row.cells[5].innerText;
        document.getElementById('adjunto').value = row.cells[6].innerText;
    }

    function guardarTransacciones() {
        const filas = document.querySelectorAll('#transacciones-list tr');
        const transacciones = [];

        filas.forEach(fila => {
            const transaccion = {
                tipoTransaccion: fila.cells[0].innerText,
                tipoIngresoEgreso: fila.cells[1].innerText,
                valor: fila.cells[2].innerText,
                cuentaBancaria: fila.cells[3].innerText,
                fechaTransaccion: fila.cells[4].innerText,
                descripcion: fila.cells[5].innerText,
                adjunto: fila.cells[6].innerText
            };
            transacciones.push(transaccion);
        });

        localStorage.setItem('transacciones', JSON.stringify(transacciones));
    }

    formAgregarTransaccion.addEventListener('submit', function (event) {
        event.preventDefault();
        agregarTransaccion();
    });

    cargarTransacciones();
    cargarCuentasBancarias();
});

function cargarTransacciones() {
    const transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
    const transaccionesList = document.getElementById('transacciones-list');

    transacciones.forEach(transaccion => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${transaccion.tipoTransaccion}</td>
            <td>${transaccion.tipoIngresoEgreso}</td>
            <td>${transaccion.valor}</td>
            <td>${transaccion.cuentaBancaria}</td>
            <td>${transaccion.fechaTransaccion}</td>
            <td>${transaccion.descripcion}</td>
            <td>${transaccion.adjunto}</td>
            <td>
                <button class="btn-editar">Editar</button>
                <button class="btn-borrar">Borrar</button>
            </td>
        `;
        transaccionesList.appendChild(fila);
        addRowEventListeners(fila);
    });
}

function cargarCuentasBancarias() {
    const cuentas = JSON.parse(localStorage.getItem('numerosCuentas')) || [];
    const cuentaBancariaSelect = document.getElementById('cuentaBancaria');

    cuentas.forEach(cuenta => {
        const option = document.createElement('option');
        option.value = cuenta;
        option.text = cuenta;
        cuentaBancariaSelect.appendChild(option);
    });
}