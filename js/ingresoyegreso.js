document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById("modalAgregarCuenta");
    const btnAgregarCuenta = document.getElementById("agregarCuenta");
    const btnCerrar = document.querySelector(".close");
    const temasList = document.getElementById('temas-list');
    const formAgregarCuenta = document.getElementById('formAgregarCuenta');
    let editingRow = null;

    btnAgregarCuenta.onclick = function () {
        modal.style.display = "block";
    }

    btnCerrar.onclick = function () {
        modal.style.display = "none";
    }

    function agregarTema() {
        const codigo = document.getElementById('codigo').value;
        const tipo = document.getElementById('tipo').value;
        const categoria = document.getElementById('categoria').value;
        const nombreTipo = document.getElementById('nombreTipo').value;
        const descripcion = document.getElementById('descripcion').value;

        if (editingRow) {
            editingRow.innerHTML = `
                <td>${codigo}</td>
                <td>${tipo}</td>
                <td>${categoria}</td>
                <td>${nombreTipo}</td>
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
                <td>${codigo}</td>
                <td>${tipo}</td>
                <td>${categoria}</td>
                <td>${nombreTipo}</td>
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
    }

    function addRowEventListeners(row) {
        const botonBorrar = row.querySelector('.btn-borrar');
        botonBorrar.addEventListener('click', function () {
            temasList.removeChild(row);
        });

        const botonEditar = row.querySelector('.btn-editar');
        botonEditar.addEventListener('click', function () {
            editarTema(row);
            modal.style.display = "block";
        });
    }

    function editarTema(row) {
        editingRow = row;
        document.getElementById('codigo').value = row.cells[0].innerText;
        document.getElementById('tipo').value = row.cells[1].innerText;
        document.getElementById('categoria').value = row.cells[2].innerText;
        document.getElementById('nombreTipo').value = row.cells[3].innerText;
        document.getElementById('descripcion').value = row.cells[4].innerText;
    }

    formAgregarCuenta.addEventListener('submit', function (event) {
        event.preventDefault();
        agregarTema();
    });
});
