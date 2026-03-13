import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { ApiService } from '../services/api.service'

@Component({
  selector:'app-mort',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl:'./mort.component.html',
  styleUrl:'./mort.component.css'
})
export class MortComponent{

  mortData:any={
    idLot:"",
    nmb:"",
    date:""
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

  saveMort(){
    if(!this.mortData.idLot || !this.mortData.nmb || !this.mortData.date){
      alert("Remplissez tous les champs")
      return
    }
    this.api.addMort(this.mortData).subscribe(()=>{
      alert("Mort ajouté")
      this.mortData={
        idLot:"",
        nmb:"",
        date:""
      }
    })
  }

}
