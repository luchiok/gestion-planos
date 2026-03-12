const express = require("express");
const cors = require("cors");
const sql = require("./db");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

/***********************
   PRUEBA SERVIDOR
************************/
app.get("/", (req, res) => {
    res.send("Servidor funcionando");
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});

/*********************************
 * OBTENER TODOS LOS CLIENTES
 *********************************/
 app.get("/clientes", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM Clientes ORDER BY id_cliente DESC");
    res.json(result.recordset);
  } catch (err) {
    console.log("Error al obtener clientes:", err);
    res.status(500).send("Error");
  }
});

/*********************************
 * CREAR CLIENTES
 *********************************/
app.post("/clientes", async (req, res) => {

  const {
    nombre,
    apellido,
    tipo_matricula,
    numero_matricula,
    correo,
    telefono,
    password
  } = req.body;

  try {

    await sql.query(`
      INSERT INTO Clientes
      (nombre, apellido, tipo_matricula, numero_matricula, correo, telefono, password)
      VALUES
      ('${nombre}','${apellido}','${tipo_matricula}','${numero_matricula}','${correo}','${telefono}','${password}')
    `);

    res.json({ ok: true });

  } catch (err) {
    console.log("Error al crear cliente:", err);
    res.status(500).send("Error");
  }

});

/*BORRAR CLIENTE*/

app.delete("/clientes/:id", async (req,res)=>{

    const id = req.params.id;

    try{

        await sql.query`
        DELETE FROM Clientes
        WHERE id_cliente = ${id}
        `;

        res.json({mensaje:"Cliente eliminado"});

    }catch(err){

        console.log(err);
        res.status(500).send("Error al eliminar");

    }

});

/*OBTENER UN CLIENTE*/
app.get("/clientes/:id", async (req,res)=>{

    const id = req.params.id;

    try{

        const result = await sql.query`
        SELECT * FROM Clientes
        WHERE id_cliente = ${id}
        `;

        res.json(result.recordset[0]);

    }catch(err){

        console.log(err);
        res.status(500).send("Error");

    }

});

/*EDITAR UN CLIENTE*/
app.put("/clientes/:id", async (req,res)=>{

    const id = req.params.id;

    const {
        nombre,
        apellido,
        tipo_matricula,
        numero_matricula,
        correo,
        telefono,
        password
    } = req.body;

    try{

        await sql.query`
        UPDATE Clientes SET
        nombre = ${nombre},
        apellido = ${apellido},
        tipo_matricula = ${tipo_matricula},
        numero_matricula = ${numero_matricula},
        correo = ${correo},
        telefono = ${telefono},
        password = ${password}
        WHERE id_cliente = ${id}
        `;

        res.json({mensaje:"Cliente actualizado"});

    }catch(err){

        console.log(err);
        res.status(500).send("Error");

    }

});



/*OBTENER TODOS LOS PROPIETARIOS*/

app.get("/propietarios", async (req,res)=>{

    try{

        const result = await sql.query`
        SELECT * FROM Propietarios
        ORDER BY id_propietario DESC
        `;

        res.json(result.recordset);

    }catch(err){

        console.log(err);
        res.status(500).send("Error");

    }

});

/*OBTENER 1 PROPIETARIO SOLO*/

app.get("/propietarios/:id", async (req,res)=>{

    const id = req.params.id;

    try{

        const result = await sql.query`
        SELECT * FROM Propietarios
        WHERE id_propietario = ${id}
        `;

        res.json(result.recordset[0]);

    }catch(err){

        console.log(err);
        res.status(500).send("Error");

    }

});

/*CREAR PROPIETARIO*/

app.post("/propietarios", async (req,res)=>{

    const {
        nombre,
        apellido,
        correo,
        dni,
        telefono,
        numero_cuenta
    } = req.body;

    try{

        await sql.query`
        INSERT INTO Propietarios
        (nombre,apellido,correo,dni,telefono,numero_cuenta)
        VALUES
        (${nombre},${apellido},${correo},${dni},${telefono},${numero_cuenta})
        `;

        res.json({mensaje:"Propietario creado"});

    }catch(err){

        console.log(err);
        res.status(500).send("Error");

    }

});

/*EDITAR PROPIETARIO*/

app.put("/propietarios/:id", async (req,res)=>{

    const id = req.params.id;

    const {
        nombre,
        apellido,
        correo,
        dni,
        telefono,
        numero_cuenta
    } = req.body;

    try{

        await sql.query`
        UPDATE Propietarios SET
        nombre = ${nombre},
        apellido = ${apellido},
        correo = ${correo},
        dni = ${dni},
        telefono = ${telefono},
        numero_cuenta = ${numero_cuenta}
        WHERE id_propietario = ${id}
        `;

        res.json({mensaje:"Propietario actualizado"});

    }catch(err){

        console.log(err);
        res.status(500).send("Error");

    }

});

/*ELiMinar PROPIETARIO*/
app.delete("/propietarios/:id", async (req,res)=>{

    const id = req.params.id;

    try{

        await sql.query`
        DELETE FROM Propietarios
        WHERE id_propietario = ${id}
        `;

        res.json({mensaje:"Propietario eliminado"});

    }catch(err){

        console.log(err);
        res.status(500).send("Error");

    }

});

/*OBTENER TODOS LOS PLANOS*/
app.get("/planos", async (req,res)=>{

    try{

        const result = await sql.query(`

SELECT 

p.id_plano,
p.fecha,
p.tipo,

c.nombre + ' ' + c.apellido AS cliente,

p.calle,
p.numero,
p.departamento,

p.entre_calle_1,
p.entre_calle_2,
p.entre_calle_3,

p.localidad,

p.estado,
p.estado_pago,

p.precio,
p.monto_pagado,

p.observacion

FROM Planos p

LEFT JOIN Clientes c 
ON p.id_cliente = c.id_cliente

ORDER BY p.fecha DESC

`);

        res.json(result.recordset);

    }catch(err){

        console.log(err);
        res.status(500).send("Error");

    }

});

/*VER PLANOS PENDIENTES*/
app.get("/planos/pendientes", async (req,res)=>{

    try{

        const result = await sql.query(`

        SELECT
        p.id_plano,
        p.calle,
        p.numero,
        p.localidad,
        p.estado,

        c.nombre + ' ' + c.apellido AS cliente

        FROM Planos p

        LEFT JOIN Clientes c
        ON p.id_cliente = c.id_cliente

        WHERE p.estado != 'Finalizado'

        ORDER BY p.fecha ASC

        `);

        res.json(result.recordset);

    }
    catch(err){

        console.log(err);
        res.status(500).send("Error");

    }

});

/*BOTON FINALIZAR, LO HACE DESAPARECER DE LA LISTA DE PENDIENTES*/
app.put("/planos/finalizar/:id", async (req,res)=>{

    const id = req.params.id;

    try{

        await sql.query`

        UPDATE Planos
        SET estado = 'Finalizado'
        WHERE id_plano = ${id}

        `;

        res.json({mensaje:"Plano finalizado"});

    }
    catch(err){

        console.log(err);
        res.status(500).send("Error");

    }

});

/*OBTENER UN PLANO POR ID*/
app.get("/planos/:id", async (req,res)=>{

    const id = req.params.id;

    try{

        const result = await sql.query`

        SELECT *
        FROM Planos
        WHERE id_plano = ${id}

        `;

        res.json(result.recordset[0]);

    }
    catch(err){

        console.log(err);
        res.status(500).send("Error");

    }

});


/*GUARDAR PLANO*/
app.post("/planos", async (req,res)=>{

    const p = req.body;

    try{

        await sql.query`

        INSERT INTO Planos
        (
        numero_plano,
        fecha,
        tipo,

        calle,
        numero,
        departamento,

        entre_calle_1,
        entre_calle_2,
        entre_calle_3,

        localidad,

        estado,
        estado_pago,

        precio,
        monto_pagado,

        observacion,

        id_cliente,
        id_propietario
        )

        VALUES
        (
        ${p.numero_plano},
        ${p.fecha},
        ${p.tipo},

        ${p.calle},
        ${p.numero},
        ${p.departamento},

        ${p.entre_calle_1},
        ${p.entre_calle_2},
        ${p.entre_calle_3},

        ${p.localidad},

        ${p.estado},
        ${p.estado_pago},

        ${p.precio},
        ${p.monto_pagado},

        ${p.observacion},

        ${p.id_cliente},
        ${p.id_propietario}

        )
        `;

        res.json({mensaje:"Plano creado"});

    }
    catch(err){

        console.log(err);
        res.status(500).send("Error");

    }

});

/*EDITAR PLANO*/
app.put("/planos/:id", async (req,res)=>{

    const id = req.params.id;
    const p = req.body;

    try{

        await sql.query`

        UPDATE Planos SET

        numero_plano = ${p.numero_plano},
        fecha = ${p.fecha},
        tipo = ${p.tipo},

        calle = ${p.calle},
        numero = ${p.numero},
        departamento = ${p.departamento},

        entre_calle_1 = ${p.entre_calle_1},
        entre_calle_2 = ${p.entre_calle_2},
        entre_calle_3 = ${p.entre_calle_3},

        localidad = ${p.localidad},

        estado = ${p.estado},

        precio = ${p.precio},
        monto_pagado = ${p.monto_pagado},

        observacion = ${p.observacion},

        id_cliente = ${p.id_cliente},
        id_propietario = ${p.id_propietario}

        WHERE id_plano = ${id}

        `;

        res.json({mensaje:"Plano actualizado"});

    }
    catch(err){

        console.log(err);
        res.status(500).send("Error");

    }

});

/*ESTADISTICAS*/

app.get("/estadisticas", async (req,res)=>{

    try{

        const result = await sql.query(`

        SELECT
        (SELECT COUNT(*) FROM Planos) AS total_planos,

        (SELECT COUNT(*) FROM Planos
        WHERE estado = 'Pendiente') AS planos_pendientes,

        (SELECT COUNT(*) FROM Planos
        WHERE MONTH(fecha) = MONTH(GETDATE())
        AND YEAR(fecha) = YEAR(GETDATE())
        ) AS planos_mes,

        (SELECT ISNULL(SUM(precio),0) FROM Planos)
        AS total_facturado,

        (SELECT ISNULL(SUM(precio - ISNULL(monto_pagado,0)),0)
        FROM Planos)
        AS total_adeudado

        `);

        res.json(result.recordset[0]);

    }
    catch(err){

        console.log(err);
        res.status(500).send("Error");

    }

});


/*DATOS PARA EL GRAFICO*/

app.get("/estadisticas/ingresos-mensuales", async (req,res)=>{

    try{

        const result = await sql.query(`

        SELECT 
        MONTH(fecha) AS mes,
        SUM(precio) AS total

        FROM Planos

        WHERE YEAR(fecha) = YEAR(GETDATE())

        GROUP BY MONTH(fecha)

        ORDER BY mes

        `);

        res.json(result.recordset);

    }
    catch(err){

        console.log(err);
        res.status(500).send("Error");

    }

});


/*borrar plano*/
app.delete("/planos/:id", async (req,res)=>{

    const id = req.params.id;

    try{

        await sql.query`
        DELETE FROM Planos
        WHERE id_plano = ${id}
        `;

        res.json({mensaje:"Plano eliminado"});

    }catch(err){

        console.log(err);
        res.status(500).send("Error");

    }

});