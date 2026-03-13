import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { ApiService } from '../services/api.service'

@Component({
  selector:'app-sakafo',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl:'./sakafo.component.html',
  styleUrl:'./sakafo.component.css'
})
export class SakafoComponent{

  sakafos:any[]=[]
  races:any[]=[]

  newSakafo:any={
    semaine:"",
    idRace:"",
    poids:"",
    quantite:""
  }

  constructor(private api:ApiService){
    this.loadRaces()
    this.loadSakafos()
  }

  loadRaces(){
    this.api.getRaces().subscribe((res:any)=>{
      this.races=res
    })
  }

  loadSakafos(){
    this.api.getSakafos().subscribe((res:any)=>{
      this.sakafos=res
    })
  }

  addSakafo(){
    if(!this.newSakafo.semaine || !this.newSakafo.idRace || !this.newSakafo.poids || this.newSakafo.quantite === ""){
      alert("Remplissez tous les champs")
      return
    }
    this.api.addSakafo(this.newSakafo).subscribe(()=>{
      alert("Sakafo ajouté")
      this.newSakafo={semaine:"",idRace:"",poids:"",quantite:""}
      this.loadSakafos()
    })
  }

  getRaceName(idRace:any){
    const race = this.races.find(r=>r.idRace==idRace)
    return race ? race.race : "Unknown"
  }

}
