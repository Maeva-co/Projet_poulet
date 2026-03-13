const express = require("express")
const router = express.Router()
const {getConnection}=require("../db")

router.post("/",async(req,res)=>{

    const {idLot,nmb,date,type}=req.body

    const pool=await getConnection()

    await pool.request()
        .input("idLot",idLot)
        .input("nmb",nmb)
        .input("date",date)
        .input("type",type)
        .query(`
            INSERT INTO Atody VALUES(@idLot,@nmb,@date,@type)
        `)

    if(type=="eclot"){

        await pool.request()
        .input("idLot",idLot)
        .input("nmb",nmb)
        .input("date",date)
        .query(`
            INSERT INTO Lot(dateLot,nmbAkoho,achat,idRace,age)
            SELECT @date,@nmb,0,idRace,0
            FROM Lot WHERE id=@idLot
        `)

    }

    res.json({message:"Atody ajouté"})

})

module.exports=router