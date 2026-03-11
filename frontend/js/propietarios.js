let propietarios = [];

document.addEventListener("DOMContentLoaded", cargarPropietarios);

async function cargarPropietarios(){

    const res = await fetch("/propietarios");

    propietarios = await res.json();

    mostrarPropietarios(propietarios);

}

function mostrarPropietarios(lista){

    const tabla =
    document.getElementById("tablaPropietarios");

    tabla.innerHTML = "";

    lista.forEach(p => {

        tabla.innerHTML += `

        <tr>

        <td>${p.id_propietario}</td>
        <td>${p.nombre ?? ""}</td>
        <td>${p.apellido ?? ""}</td>
        <td>${p.dni ?? ""}</td>
        <td>${p.correo ?? ""}</td>
        <td>${p.telefono ?? ""}</td>
        <td>${p.numero_cuenta ?? ""}</td>

        </tr>

        `;

    });

}

function filtrarPropietarios(){

    const texto =
    document.getElementById("buscarPropietario")
    .value
    .toLowerCase();

    const filtrados =
    propietarios.filter(p =>

        (p.nombre ?? "").toLowerCase().includes(texto) ||
        (p.apellido ?? "").toLowerCase().includes(texto) ||
        (p.dni ?? "").toLowerCase().includes(texto)

    );

    mostrarPropietarios(filtrados);

}