document.addEventListener("DOMContentLoaded", cargarClientes);

async function cargarClientes(){

    const res = await fetch("/clientes");

    const data = await res.json();

    const tabla =
    document.getElementById("tablaClientes");

    tabla.innerHTML = "";

    data.forEach(c => {

        tabla.innerHTML += `

        <tr>

        <td>${c.id_cliente}</td>
        <td>${c.nombre ?? ""}</td>
        <td>${c.apellido ?? ""}</td>
        <td>${c.tipo_matricula ?? ""}</td>
        <td>${c.numero_matricula ?? ""}</td>
        <td>${c.correo ?? ""}</td>
        <td>${c.telefono ?? ""}</td>

        </tr>

        `;

    });

}