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
        const tipoAlerta = document.getElementById('tipoAlerta').value;
        const descripcionA = document.getElementById('descripcionA').value;
        const fechaYHora = document.getElementById('fechaYHora').value;
        const repeticionA = document.getElementById('repeticionA').value;

        if (editingRow) {
            editingRow.innerHTML = `
                <td>${tipoAlerta}</td>
                <td>${descripcionA}</td>
                <td>${fechaYHora}</td>
                <td>${repeticionA}</td>
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
                <td>${tipoAlerta}</td>
                <td>${descripcionA}</td>
                <td>${fechaYHora}</td>
                <td>${repeticionA}</td>
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
            guardarCambios();
        });

        const botonEditar = row.querySelector('.btn-editar');
        botonEditar.addEventListener('click', function () {
            editarTema(row);
            modal.style.display = "block";
        });
    }

    function editarTema(row) {
        editingRow = row;
        document.getElementById('tipoAlerta').value = row.cells[0].innerText;
        document.getElementById('descripcionA').value = row.cells[1].innerText;
        document.getElementById('fechaYHora').value = row.cells[2].innerText;
        document.getElementById('repeticionA').value = row.cells[3].innerText;
    }

    function guardarCambios() {
        const filas = document.querySelectorAll('#temas-list tr');
        const temas = [];

        filas.forEach(fila => {
            const tema = {
                tipoAlerta: fila.cells[0].innerText,
                descripcionA: fila.cells[1].innerText,
                fechaYHora: fila.cells[2].innerText,
                repeticionA: fila.cells[3].innerText
            };
            temas.push(tema);
        });

        localStorage.setItem('temas', JSON.stringify(temas));

    }

    function cargarTemas() {
        const temas = JSON.parse(localStorage.getItem('temas')) || [];

        temas.forEach(tema => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${tema.tipoAlerta}</td>
                <td>${tema.descripcionA}</td>
                <td>${tema.fechaYHora}</td>
                <td>${tema.repeticionA}</td>
                <td>
                    <button class="btn-editar">Editar</button>
                    <button class="btn-borrar">Borrar</button>
                </td>
            `;
            temasList.appendChild(fila);
            addRowEventListeners(fila);
        });
    }

    formAgregarCuenta.addEventListener('submit', function (event) {
        event.preventDefault();
        agregarTema();

    });


    cargarTemas();

    document.querySelector('button[onclick="guardarCambios()"]').addEventListener('click', guardarCambios);

    
});
