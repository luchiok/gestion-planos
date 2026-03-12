document.addEventListener("DOMContentLoaded", iniciar);

async function iniciar(){
    

    await cargarClientes();
    await cargarPropietarios();

    cargarPlanoSiEsEdicion(); // 👈 ESTA LINEA ES NUEVA

    document.getElementById("precio").addEventListener("input", function(){
    formatearMoneda(this);
    });

    document.getElementById("monto_pagado").addEventListener("input", function(){
    formatearMoneda(this);
    });
    document.getElementById("numero_plano").addEventListener("change", calcularPrecio);

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

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

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

        precio: document.getElementById("precio").value.replace(/\$|\./g,''),

        monto_pagado: document.getElementById("monto_pagado").value.replace(/\$|\./g,''),

        observacion: document.getElementById("observacion").value,

        id_cliente: document.getElementById("id_cliente").value,
        id_propietario: document.getElementById("id_propietario").value || null

    };

    let url = "/planos";
    let metodo = "POST";

    if(id){
        url = "/planos/" + id;
        metodo = "PUT";
    }

    await fetch(url,{
        method: metodo,
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(plano)
    });

    window.location.href = "planos.html";

}

function volver(){

    window.location.href = "planos.html";

}

/*FORMATO DE MONEDA*/
function formatearMoneda(input){

    let valor = input.value.replace(/\D/g,'');

    if(valor === ''){
        input.value = '';
        return;
    }

    valor = parseInt(valor).toLocaleString('es-AR');

    input.value = '$' + valor;
}

/*EDICION*/
async function cargarPlanoSiEsEdicion(){

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if(!id) return;

    const res = await fetch(`/planos/${id}`);
    const plano = await res.json();

    document.getElementById("numero_plano").value = plano.numero_plano;
    document.getElementById("fecha").value = plano.fecha.split("T")[0];
    document.getElementById("tipo").value = plano.tipo;

    document.getElementById("calle").value = plano.calle;
    document.getElementById("numero").value = plano.numero;
    document.getElementById("departamento").value = plano.departamento;

    document.getElementById("entre_calle_1").value = plano.entre_calle_1;
    document.getElementById("entre_calle_2").value = plano.entre_calle_2;
    document.getElementById("entre_calle_3").value = plano.entre_calle_3;

    document.getElementById("localidad").value = plano.localidad;

    document.getElementById("estado").value = plano.estado;

    document.getElementById("precio").value = '$' + parseInt(plano.precio).toLocaleString('es-AR');
    document.getElementById("monto_pagado").value = '$' + parseInt(plano.monto_pagado).toLocaleString('es-AR');

    document.getElementById("observacion").value = plano.observacion;

    document.getElementById("id_cliente").value = plano.id_cliente;
    document.getElementById("id_propietario").value = plano.id_propietario;

}

/*CALCULAR PRECIO*/
function calcularPrecio(){

    const cantidad = document.getElementById("numero_plano").value;

    const precioUnitario = 100000;

    if(!cantidad) return;

    const total = cantidad * precioUnitario;

    const inputPrecio = document.getElementById("precio");

    inputPrecio.value = '$' + total.toLocaleString('es-AR');

}