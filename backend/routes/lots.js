const express = require("express")
const router = express.Router()
const {getConnection}=require("../db")

router.get("/",async(req,res)=>{
    const pool=await getConnection()
    const lots = await pool.request().query(`SELECT * FROM Lot`)
    res.json(lots.recordset)
})

router.post("/",async(req,res)=>{
    const {dateLot,nmbAkoho,achat,idRace}=req.body
    
    const pool=await getConnection()
    
    await pool.request()
        .input("dateLot",dateLot)
        .input("nmbAkoho",nmbAkoho)
        .input("achat",achat)
        .input("idRace",idRace)
        .query(`
            INSERT INTO Lot(dateLot,nmbAkoho,achat,idRace,age) 
            VALUES(@dateLot,@nmbAkoho,@achat,@idRace,0)
        `)
    
    res.json({message:"Lot créé"})
})

module.exports=router
