const params = new URLSearchParams(window.location.search);
const id = params.get("id");

document
.getElementById("formPropietario")
.addEventListener("submit", guardarPropietario);

if(id){
    cargarPropietario();
}

async function cargarPropietario(){

    const res = await fetch("/propietarios/" + id);
    const p = await res.json();

    document.getElementById("nombre").value = p.nombre;
    document.getElementById("apellido").value = p.apellido;
    document.getElementById("dni").value = p.dni;
    document.getElementById("correo").value = p.correo;
    document.getElementById("telefono").value = p.telefono;
    document.getElementById("numero_cuenta").value = p.numero_cuenta;

}

async function guardarPropietario(e){

    e.preventDefault();

    const propietario = {

        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        dni: document.getElementById("dni").value,
        correo: document.getElementById("correo").value,
        telefono: document.getElementById("telefono").value,
        numero_cuenta: document.getElementById("numero_cuenta").value

    };

    if(id){

        await fetch("/propietarios/" + id,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(propietario)
        });

    }else{

        await fetch("/propietarios",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(propietario)
        });

    }

    window.location.href = "propietarios.html";

}

function volver(){

    window.location.href = "propietarios.html";

}