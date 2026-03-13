import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { ApiService } from '../services/api.service'

@Component({
  selector:'app-lots',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl:'./lots.component.html',
  styleUrl:'./lots.component.css'
})
export class LotsComponent{

  lots:any[]=[]
  races:any[]=[]

  newLot:any={
    dateLot:"",
    nmbAkoho:"",
    achat:"",
    idRace:""
  }

  constructor(private api:ApiService){
    this.loadRaces()
    this.loadLots()
  }

  loadRaces(){
    this.api.getRaces().subscribe((res:any)=>{
      this.races=res
    })
  }

  loadLots(){
    this.api.getLots().subscribe((res:any)=>{
      this.lots=res
    })
  }

  addLot(){
    if(!this.newLot.dateLot || !this.newLot.nmbAkoho || this.newLot.achat === "" || !this.newLot.idRace){
      alert("Remplissez tous les champs")
      return
    }
    this.api.addLot(this.newLot).subscribe(()=>{
      alert("Lot créé")
      this.newLot={dateLot:"",nmbAkoho:"",achat:"",idRace:""}
      this.loadLots()
    })
  }

  getRaceName(idRace:any){
    const race = this.races.find(r=>r.idRace==idRace)
    return race ? race.race : "Unknown"
  }

}
