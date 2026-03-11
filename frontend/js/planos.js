let planos = [];

document.addEventListener("DOMContentLoaded", cargarPlanos);

async function cargarPlanos(){

    const res = await fetch("/planos");
    planos = await res.json();

    mostrarPlanos(planos);

}

function mostrarPlanos(lista){

    const tabla = document.getElementById("tablaPlanos");

    tabla.innerHTML = "";

    lista.forEach(p => {

        tabla.innerHTML += `

        <tr>

        <td>${p.id_plano ?? ""}</td>

        <td>${formatearFecha(p.fecha)}</td>

        <td>${p.tipo ?? ""}</td>

        <td>${p.cliente ?? ""}</td>

        <td>${p.calle ?? ""}</td>

        <td>${p.numero ?? ""}</td>

        <td>${p.departamento ?? ""}</td>

        <td>${p.entre_calle_1 ?? ""}</td>

        <td>${p.entre_calle_2 ?? ""}</td>

        <td>${p.entre_calle_3 ?? ""}</td>

        <td>${p.localidad ?? ""}</td>

        <td>${p.estado ?? ""}</td>

        <td>${p.estado_pago ?? ""}</td>

        <td>${p.precio ?? ""}</td>

        <td>${p.monto_pagado ?? ""}</td>

        <td>${p.observacion ?? ""}</td>

        <td>

        <button onclick="editarPlano(${p.id_plano})">✏</button>

        <button onclick="borrarPlano(${p.id_plano})">🗑</button>

        <button onclick="finalizarPlano(${p.id_plano})">✅</button>

        </td>

        </tr>

        `;

    });

}


/* EDITAR */

function editarPlano(id){

    window.location.href = "plano_form.html?id=" + id;

}


/* BORRAR */

async function borrarPlano(id){

    if(!confirm("¿Eliminar este plano?")) return;

    await fetch("/planos/" + id, {

        method: "DELETE"

    });

    cargarPlanos();

}


/* FINALIZAR */

async function finalizarPlano(id){

    if(!confirm("¿Finalizar este plano?")) return;

    await fetch("/planos/finalizar/" + id, {

        method: "PUT"

    });

    cargarPlanos();

}


/* FILTROS */

function filtrarPlanos(){

    const cliente =
    document.getElementById("buscarCliente").value.toLowerCase();

    const direccion =
    document.getElementById("buscarDireccion").value.toLowerCase();

    const estado =
    document.getElementById("buscarEstado").value.toLowerCase();

    const filtrados = planos.filter(p => {

        const clientePlano = (p.cliente ?? "").toLowerCase();

        const direccionPlano =
        ((p.calle ?? "") + " " + (p.numero ?? "")).toLowerCase();

        const estadoPlano = (p.estado ?? "").toLowerCase();

        return (

            clientePlano.includes(cliente) &&
            direccionPlano.includes(direccion) &&
            (estado === "" || estadoPlano === estado)

        );

    });

    mostrarPlanos(filtrados);

}


/* FORMATEAR FECHA */

function formatearFecha(fecha){

    if(!fecha) return "";

    const f = new Date(fecha);

    return f.toLocaleDateString("es-AR");

}