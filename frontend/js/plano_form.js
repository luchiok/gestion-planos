document.addEventListener("DOMContentLoaded", iniciar);

async function iniciar(){

    await cargarClientes();
    await cargarPropietarios();

}

async function cargarClientes(){

    const res = await fetch("/clientes");
    const clientes = await res.json();

    const select = document.getElementById("id_cliente");

    clientes.forEach(c => {

        select.innerHTML += `
        <option value="${c.id_cliente}">
        ${c.nombre} ${c.apellido}
        </option>
        `;

    });

}

async function cargarPropietarios(){

    const res = await fetch("/propietarios");
    const propietarios = await res.json();

    const select = document.getElementById("id_propietario");

    propietarios.forEach(p => {

        select.innerHTML += `
        <option value="${p.id_propietario}">
        ${p.nombre} ${p.apellido}
        </option>
        `;

    });

}

document
.getElementById("formPlano")
.addEventListener("submit", guardarPlano);

async function guardarPlano(e){

    e.preventDefault();

    console.log("Guardando plano...");

    const plano = {

        numero_plano: document.getElementById("numero_plano").value,
        fecha: document.getElementById("fecha").value,
        tipo: document.getElementById("tipo").value,

        calle: document.getElementById("calle").value,
        numero: document.getElementById("numero").value,
        departamento: document.getElementById("departamento").value,

        entre_calle_1: document.getElementById("entre_calle_1").value,
        entre_calle_2: document.getElementById("entre_calle_2").value,
        entre_calle_3: document.getElementById("entre_calle_3").value,

        localidad: document.getElementById("localidad").value,

        estado: document.getElementById("estado").value,
        estado_pago: document.getElementById("estado_pago").value,

        precio: document.getElementById("precio").value,
        monto_pagado: document.getElementById("monto_pagado").value,

        observacion: document.getElementById("observacion").value,

        id_cliente: document.getElementById("id_cliente").value,
        id_propietario: document.getElementById("id_propietario").value || null

    };

    await fetch("/planos",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(plano)

    });

    window.location.href = "planos.html";

}

function volver(){

    window.location.href = "planos.html";

}

