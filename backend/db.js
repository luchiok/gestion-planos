const sql = require("mssql");

const config = {
    user: "appplanos",
    password: "123456",
    server: "localhost\\SQLEXPRESS",
    database: "GestionPlanos",
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

sql.connect(config)
.then(() => {
    console.log("Conectado a SQL Server");
})
.catch(err => {
    console.log("Error de conexión:", err);
});

module.exports = sql;