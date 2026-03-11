document.addEventListener("DOMContentLoaded", cargarDashboard);

async function cargarDashboard(){

    await cargarEstadisticas();
    await cargarGrafico();

}


/* ESTADISTICAS */

async function cargarEstadisticas(){

    const res = await fetch("/estadisticas");

    const data = await res.json();

    document.getElementById("totalPlanos").innerText =
    data.total_planos;

    document.getElementById("planosPendientes").innerText =
    data.planos_pendientes;

    document.getElementById("planosMes").innerText =
    data.planos_mes;

    document.getElementById("totalFacturado").innerText =
    "$" + data.total_facturado;

    document.getElementById("totalAdeudado").innerText =
    "$" + data.total_adeudado;

}


/* GRAFICO INGRESOS */

async function cargarGrafico(){

    const res = await fetch("/estadisticas/ingresos-mensuales");
    const datos = await res.json();

    const meses = [
        "Ene","Feb","Mar","Abr","May","Jun",
        "Jul","Ago","Sep","Oct","Nov","Dic"
    ];

    // Array con 12 meses en 0
    const valores = new Array(12).fill(0);

    // llenar los meses que tengan datos
    datos.forEach(d => {

        const indice = d.mes - 1;

        valores[indice] = d.total;

    });

    new Chart(document.getElementById("graficoIngresos"), {

        type: "bar",

        data: {

            labels: meses,

            datasets: [{
                label: "Ingresos",
                data: valores
            }]

        }

    });

}