const express = require("express")
const router = express.Router()
const {getConnection} = require("../db")
const {calculAge,calculPoids,calculSakafo} = require("../services/calcul")

router.get("/", async (req,res)=>{

    const dateFiltre = req.query.date || new Date()

    const pool = await getConnection()

    const lots = await pool.request().query(`SELECT * FROM Lot`)
    const races = await pool.request().query(`SELECT * FROM Race`)
    const sakafo = await pool.request().query(`SELECT * FROM Sakafo`)

    let morts
    let atody

    if(req.query.date){

        morts = await pool.request()
        .query(`SELECT * FROM AkohoMaty WHERE dateMaty <= '${dateFiltre}'`)

        atody = await pool.request()
        .query(`SELECT * FROM Atody WHERE dateAtody <= '${dateFiltre}'`)

    }else{

        morts = await pool.request().query(`SELECT * FROM AkohoMaty`)
        atody = await pool.request().query(`SELECT * FROM Atody`)

    }

    let resultat=[]

    for(let lot of lots.recordset){

        if(req.query.date && new Date(lot.dateLot) > new Date(dateFiltre)) continue

        const race = races.recordset.find(r=>r.idRace==lot.idRace)

        const sakafoRace = sakafo.recordset.filter(s=>s.idRace==lot.idRace)

        const mortLot = morts.recordset
        .filter(m=>m.idLot==lot.id)
        .reduce((s,m)=>s+m.nmbMaty,0)

        const nmbAkoho = lot.nmbAkoho - mortLot

        let age

        if(req.query.date){
            age = calculAge(lot.dateLot,dateFiltre)
        }else{
            age = {semaine:lot.age+1 , reste:0}
        }

        const poids = calculPoids(sakafoRace,age.semaine,age.reste)


        const prixLot = poids * race.prixPoulet * nmbAkoho

        const sakafoPrix = calculSakafo(
            sakafoRace,
            age.semaine,
            age.reste,
            nmbAkoho,
            race.prixSakafo
        )

        const atodyLot = atody.recordset.filter(a=>a.idLot==lot.id)

        const normal = atodyLot
        .filter(a=>a.type=="normal")
        .reduce((s,a)=>s+a.nmbAtody,0)

        const eclot = atodyLot
        .filter(a=>a.type=="eclot")
        .reduce((s,a)=>s+a.nmbAtody,0)

        const lamokany = atodyLot
        .filter(a=>a.type=="lamokany")
        .reduce((s,a)=>s+a.nmbAtody,0)

        const nmbAtody = normal - (eclot + lamokany)

        const prixAtody = nmbAtody * race.puAtody

        const benefice = prixAtody + prixLot - (lot.achat + sakafoPrix)

        resultat.push({
            lot:lot.id,
            nmbAkoho,
            achat:lot.achat,
            sakafo:sakafoPrix,
            mort:mortLot,
            poids,
            prixLot,
            nmbAtody,
            prixAtody,
            benefice
        })

    }

    res.json(resultat)

})

module.exports = router