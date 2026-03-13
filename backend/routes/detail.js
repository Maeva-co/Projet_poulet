const express = require("express")
const router = express.Router()
const {getConnection}=require("../db")

router.get("/:id",async(req,res)=>{

    const lotId = req.params.id

    const pool=await getConnection()

    const lot = await pool.request()
        .input("id",lotId)
        .query(`SELECT * FROM Lot WHERE id=@id`)

    const morts = await pool.request()
        .input("idLot",lotId)
        .query(`SELECT * FROM AkohoMaty WHERE idLot=@idLot`)

    const oeufs = await pool.request()
        .input("idLot",lotId)
        .query(`SELECT * FROM Atody WHERE idLot=@idLot`)

    res.json({
        lot: lot.recordset[0],
        morts: morts.recordset,
        oeufs: oeufs.recordset
    })

})

module.exports=router
