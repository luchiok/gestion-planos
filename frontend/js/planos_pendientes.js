document.addEventListener("DOMContentLoaded", cargarPendientes);

async function cargarPendientes(){

    const res = await fetch("/planos/pendientes");

    const data = await res.json();

    const tabla =
    document.getElementById("tablaPendientes");

    tabla.innerHTML = "";

    data.forEach(p => {

        tabla.innerHTML += `

        <tr>

        <td>${p.id_plano}</td>

        <td>${p.cliente ?? ""}</td>

        <td>${p.calle ?? ""} ${p.numero ?? ""}</td>

        <td>${p.localidad ?? ""}</td>

        <td>${p.estado ?? ""}</td>

        <td>
        <button onclick="finalizarPlano(${p.id_plano})">
        FINALIZAR
        </button>
        </td>

        </tr>

        `;

    });

}

async function finalizarPlano(id){

    if(!confirm("¿Finalizar este plano?")) return;

    await fetch("/planos/finalizar/" + id,{

        method:"PUT"

    });

    cargarPendientes();

}