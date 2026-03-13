import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { ApiService } from '../services/api.service'

@Component({
  selector:'app-dashboard',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl:'./dashboard.component.html',
  styleUrl:'./dashboard.component.css'
})
export class DashboardComponent{

  dashboardData:any[]=[]

  date:any=""

  constructor(private api:ApiService){
    this.setTodayDate()
    this.load()
  }

  setTodayDate(){
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.date = `${year}-${month}-${day}`;
  }

  load(){
    this.api.getDashboard(this.date).subscribe((res:any)=>{
      this.dashboardData=res
    })
  }

}