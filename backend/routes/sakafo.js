const express = require("express")
const router = express.Router()
const {getConnection}=require("../db")

router.get("/",async(req,res)=>{
    const pool=await getConnection()
    const sakafos = await pool.request().query(`SELECT * FROM Sakafo`)
    res.json(sakafos.recordset)
})

router.post("/",async(req,res)=>{
    const {semaine,idRace,poids,quantite}=req.body
    
    const pool=await getConnection()
    
    await pool.request()
        .input("semaine",semaine)
        .input("idRace",idRace)
        .input("poids",poids)
        .input("quantite",quantite)
        .query(`
            INSERT INTO Sakafo(semaine,idRace,poids,quantite) 
            VALUES(@semaine,@idRace,@poids,@quantite)
        `)
    
    res.json({message:"Sakafo ajouté"})
})

module.exports=router
