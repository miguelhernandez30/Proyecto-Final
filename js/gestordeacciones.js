document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formAgregarCuenta');
    const actionsContainer = document.getElementById('actions');

    function loadActions() {
        const actions = JSON.parse(localStorage.getItem('acciones')) || [];
        actionsContainer.innerHTML = '';
        actions.forEach((action, index) => {
            const actionDiv = document.createElement('div');
            actionDiv.className = 'action-card';
            actionDiv.innerHTML = `
                <h3>${action.tipo === 'ingreso' ? 'Ingreso' : 'Egreso'}</h3>
                <p>Nombre: ${action.nombre}</p>
                <p>Fecha: ${action.fecha}</p>
                <p>Valor: $${action.valor}</p>
                <button class="edit" data-index="${index}">✎</button>
                <button class="delete" data-index="${index}">✖</button>
            `;
            actionsContainer.appendChild(actionDiv);
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const tipo = document.getElementById('tipo').value;
        const nombre = document.getElementById('nombredeAccion').value;
        const fecha = document.getElementById('fechadeAccion').value;
        const valor = document.getElementById('valor').value;
        
        const newAction = { tipo, nombre, fecha, valor };
        
        const actions = JSON.parse(localStorage.getItem('acciones')) || [];
        actions.push(newAction);
        localStorage.setItem('acciones', JSON.stringify(actions));
        
        form.reset();
        loadActions();
    });

    actionsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const index = e.target.getAttribute('data-index');
            const actions = JSON.parse(localStorage.getItem('acciones')) || [];
            actions.splice(index, 1);
            localStorage.setItem('acciones', JSON.stringify(actions));
            loadActions();
        }

        if (e.target.classList.contains('edit')) {
            const index = e.target.getAttribute('data-index');
            const actions = JSON.parse(localStorage.getItem('acciones')) || [];
            const action = actions[index];
            
            document.getElementById('tipo').value = action.tipo;
            document.getElementById('nombredeAccion').value = action.nombre;
            document.getElementById('fechadeAccion').value = action.fecha;
            document.getElementById('valor').value = action.valor;

            actions.splice(index, 1);
            localStorage.setItem('acciones', JSON.stringify(actions));
            loadActions();
        }
    });

    loadActions();
});
