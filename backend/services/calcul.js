function joursEntre(date1,date2){
    const diff = new Date(date2) - new Date(date1)
    return Math.floor(diff/(1000*60*60*24))
}

// function calculAge(dateLot,dateFiltre){

//     const jours = joursEntre(dateLot,dateFiltre)

//     if(jours < 7){
//         return {semaine:0, reste:0}
//     }

//     const joursApresS0 = jours - 7

//     const semaine = Math.floor(joursApresS0/7) + 1
//     const reste = joursApresS0 % 7

//     return {semaine,reste}
// }

function calculAge(dateLot,dateFiltre){

    const jours = joursEntre(dateLot,dateFiltre)
    
    if(jours < 7){
        return {semaine:0, reste:0}
    }

    const joursApresS0 = jours - 7

    const semaine = Math.floor(joursApresS0/7) + 1
    
    const reste = (joursApresS0 % 7)+1
    return {semaine,reste}
}

function calculPoids(sakafo,semaine,reste){

    let poids = 0

    // S0 toujours complet
    const s0 = sakafo.find(x=>x.semaine==0)
    if(s0) poids += s0.poids

    // semaines complètes S1 → S(semaine-1)
    for(let i = 1;i < semaine;i++){
        const s = sakafo.find(x=>x.semaine==i)
        if(s) poids += s.poids
    }

    // semaine en cours (progression)
    if (reste != 0) {
        const s = sakafo.find(x=>x.semaine==semaine)
    
        if(s){
            poids += ((reste)/7) * s.poids
        }
    }

    return poids
}

function calculSakafo(sakafo,semaine,reste,nmbAkoho,prix){

    let total = 0

    // semaines complètes S1 → S(semaine-1)
    for(let i=1;i<semaine;i++){
        const s = sakafo.find(x=>x.semaine==i)
        if(s) total += s.quantite
    }

    // progression semaine actuelle
    if (reste != 0) {
        const s = sakafo.find(x=>x.semaine==semaine)
    
        if(s){
            total += ((reste)/7) * s.quantite
        }
    }

    return total * nmbAkoho * prix
}
// function calculPoids(sakafo,semaine,reste){

//     let poids = 0

//     // semaines complètes
//     for(let i=0;i<=semaine;i++){
//         const s = sakafo.find(x=>x.semaine==i)
//         if(s) poids += s.poids
//     }

//     // progression semaine suivante
//     const s = sakafo.find(x=>x.semaine==semaine+1)

//     if(s){
//         poids += (reste/7) * s.poids
//     }

//     return poids
// }

// function calculSakafo(sakafo,semaine,reste,nmbAkoho,prix){

//     let total = 0

//     // semaines complètes (S1+)
//     for(let i=1;i<=semaine;i++){
//         const s = sakafo.find(x=>x.semaine==i)
//         if(s) total += s.quantite
//     }

//     // progression semaine suivante
//     const s = sakafo.find(x=>x.semaine==semaine+1)

//     if(s){
//         total += (reste/7) * s.quantite
//     }

//     return total * nmbAkoho * prix
// }


// function calculPoids(sakafo,q,r){

//     let poids = sakafo[0].poids

//     for(let i=1;i<=q;i++){
//         if(sakafo[i]) poids += sakafo[i].poids
//     }

//     if(sakafo[q+1]){
//         poids += (r/7)*sakafo[q+1].poids
//     }

//     return poids
// }

// function calculSakafo(sakafo,q,r,nmbAkoho,prix){

//     let total = 0

//     for(let i=1;i<=q;i++){
//         if(sakafo[i]) total += sakafo[i].quantite
//     }

//     if(sakafo[q+1]){
//         total += (r/7)*sakafo[q+1].quantite
//     }

//     return total*nmbAkoho*prix
// }

module.exports={
    calculAge,
    calculPoids,
    calculSakafo
}