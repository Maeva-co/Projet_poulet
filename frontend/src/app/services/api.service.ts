import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'

@Injectable({
  providedIn:'root'
})
export class ApiService{

  base="http://localhost:3000"

  constructor(private http:HttpClient){}

  // Dashboard
  getDashboard(date:any){
    return this.http.get(this.base+"/dashboard?date="+date)
  }

  // Morts
  addMort(data:any){
    return this.http.post(this.base+"/mort",data)
  }

  // Atody
  addAtody(data:any){
    return this.http.post(this.base+"/atody",data)
  }

  // Races
  getRaces(){
    return this.http.get(this.base+"/races")
  }

  addRace(data:any){
    return this.http.post(this.base+"/races",data)
  }

  // Sakafo
  getSakafos(){
    return this.http.get(this.base+"/sakafo")
  }

  addSakafo(data:any){
    return this.http.post(this.base+"/sakafo",data)
  }

  // Lots
  getLots(){
    return this.http.get(this.base+"/lots")
  }

  addLot(data:any){
    return this.http.post(this.base+"/lots",data)
  }

  // Detail Lot
  getDetailLot(id:any){
    return this.http.get(this.base+"/detail/"+id)
  }

}



