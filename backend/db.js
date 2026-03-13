const sql = require("mssql")

const config = {
    user: "sa",
    password: "MotDePasseAdmin0404!",
    server: "localhost",
    database: "AkohoDB",
    options:{
        encrypt:false,
        trustServerCertificate:true
    }
}

async function getConnection(){
    return await sql.connect(config)
}

module.exports = {sql,getConnection}
