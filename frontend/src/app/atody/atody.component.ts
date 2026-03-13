import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { ApiService } from '../services/api.service'

@Component({
  selector:'app-atody',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl:'./atody.component.html',
  styleUrl:'./atody.component.css'
})
export class AtodyComponent{

  atodyData:any={
    idLot:"",
    nmb:"",
    date:"",
    type:"normal"
  }

  lots:any[]=[]

  constructor(private api:ApiService){
    this.loadLots()
  }

  loadLots(){
    this.api.getLots().subscribe((res:any)=>{
      this.lots=res
    })
  }

  saveAtody(){
    if(!this.atodyData.idLot || !this.atodyData.nmb || !this.atodyData.date || !this.atodyData.type){
      alert("Remplissez tous les champs")
      return
    }
    this.api.addAtody(this.atodyData).subscribe(()=>{
      alert("Atody ajouté")
      if(this.atodyData.type === "eclot"){
        alert("Un nouveau lot éclot a été créé automatiquement")
      }
      this.atodyData={
        idLot:"",
        nmb:"",
        date:"",
        type:"normal"
      }
    })
  }

}
