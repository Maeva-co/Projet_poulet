const express = require("express")
const router = express.Router()
const {getConnection}=require("../db")

router.post("/",async(req,res)=>{

    const {idLot,nmb,date}=req.body

    const pool=await getConnection()

    await pool.request()
        .input("idLot",idLot)
        .input("nmb",nmb)
        .input("date",date)
        .query(`
            INSERT INTO AkohoMaty VALUES(@idLot,@nmb,@date)
        `)

    res.json({message:"Mort ajouté"})
})

module.exports=router