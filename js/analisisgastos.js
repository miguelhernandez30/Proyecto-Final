document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('graficaIngresosEgresos').getContext('2d');
    const data = {
        labels: ['Salario', 'Ventas', 'Intereses', 'Gastos Generales'],
        ingresos: [1500, 1200, 500, 200], // Cambiado a minúsculas
        egresos: [800, 300, 400, 600]     // Cambiado a minúsculas
    };

    const grafica = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Ingresos',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                data: data.ingresos
            }, {
                label: 'Egresos',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                data: data.egresos
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    function actualizarGrafica(transacciones) {
        const categorias = [];
        const ingresos = [];
        const egresos = [];

        transacciones.forEach(transaccion => {
            categorias.push(transaccion.tipoTransaccion);
            if (transaccion.tipoIngresoEgreso === 'Ingreso') {
                ingresos.push(transaccion.valor);
                egresos.push(0);
            } else {
                ingresos.push(0);
                egresos.push(transaccion.valor);
            }
        });

        grafica.data.labels = categorias;
        grafica.data.datasets[0].data = ingresos;
        grafica.data.datasets[1].data = egresos;
        grafica.update();
    }

    const transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
    actualizarGrafica(transacciones);
});
