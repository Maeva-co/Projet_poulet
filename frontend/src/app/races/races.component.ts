import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { ApiService } from '../services/api.service'

@Component({
  selector:'app-races',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl:'./races.component.html',
  styleUrl:'./races.component.css'
})
export class RacesComponent{

  races:any[]=[]

  newRace:any={
    race:"",
    prixSakafo:"",
    prixPoulet:"",
    puAtody:""
  }

  constructor(private api:ApiService){
    this.loadRaces()
  }

  loadRaces(){
    this.api.getRaces().subscribe((res:any)=>{
      this.races=res
    })
  }

  addRace(){
    if(!this.newRace.race || !this.newRace.prixSakafo || !this.newRace.prixPoulet || !this.newRace.puAtody){
      alert("Remplissez tous les champs")
      return
    }
    this.api.addRace(this.newRace).subscribe(()=>{
      alert("Race ajoutée")
      this.newRace={race:"",prixSakafo:"",prixPoulet:"",puAtody:""}
      this.loadRaces()
    })
  }

}
