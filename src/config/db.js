const sql = require("mssql");
require("dotenv").config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),

    options:{
        encrypt: false,
        trustServerCertificate: true
    }
}


const poolPromish = new sql.ConnectionPool(dbConfig)
.connect()
.then(pool =>{
    console.log("SQL server Connected Successfully")
    return pool;
})
.catch(error =>{
console.error("Database Connection Failed", error)
throw error;
});



module.exports = {
    sql,
    poolPromish,
}
