const express = require("express")
const router = express.Router()
const {getConnection}=require("../db")

router.get("/",async(req,res)=>{
    const pool=await getConnection()
    const races = await pool.request().query(`SELECT * FROM Race`)
    res.json(races.recordset)
})

router.post("/",async(req,res)=>{
    const {race,prixSakafo,prixPoulet,puAtody}=req.body
    
    const pool=await getConnection()
    
    await pool.request()
        .input("race",race)
        .input("prixSakafo",prixSakafo)
        .input("prixPoulet",prixPoulet)
        .input("puAtody",puAtody)
        .query(`
            INSERT INTO Race(race,prixSakafo,prixPoulet,puAtody) 
            VALUES(@race,@prixSakafo,@prixPoulet,@puAtody)
        `)
    
    res.json({message:"Race ajoutée"})
})

module.exports=router
