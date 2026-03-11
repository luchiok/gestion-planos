const params = new URLSearchParams(window.location.search);
const id = params.get("id");

document.getElementById("formCliente").addEventListener("submit", guardarCliente);

if(id){
    cargarCliente();
}

async function cargarCliente(){

    const res = await fetch("/clientes/" + id);
    const cliente = await res.json();

    document.getElementById("nombre").value = cliente.nombre;
    document.getElementById("apellido").value = cliente.apellido;
    document.getElementById("tipo_matricula").value = cliente.tipo_matricula;
    document.getElementById("numero_matricula").value = cliente.numero_matricula;
    document.getElementById("correo").value = cliente.correo;
    document.getElementById("telefono").value = cliente.telefono;
    document.getElementById("password").value = cliente.password;

}

async function guardarCliente(e){

    e.preventDefault();

    const cliente = {

        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        tipo_matricula: document.getElementById("tipo_matricula").value,
        numero_matricula: document.getElementById("numero_matricula").value,
        correo: document.getElementById("correo").value,
        telefono: document.getElementById("telefono").value,
        password: document.getElementById("password").value

    };

    if(id){

        await fetch("/clientes/" + id,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(cliente)
        });

    }else{

        await fetch("/clientes",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(cliente)
        });

    }

    window.location.href = "clientes.html";

}

function volver(){

    window.location.href = "clientes.html";

}