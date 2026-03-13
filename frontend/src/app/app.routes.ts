import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MortComponent } from './mort/mort.component';
import { AtodyComponent } from './atody/atody.component';
import { RacesComponent } from './races/races.component';
import { SakafoComponent } from './sakafo/sakafo.component';
import { LotsComponent } from './lots/lots.component';

export const routes: Routes = [

  {path:'',component:DashboardComponent},
  {path:'morts',component:MortComponent},
  {path:'oeufs',component:AtodyComponent},
  {path:'races',component:RacesComponent},
  {path:'sakafo',component:SakafoComponent},
  {path:'lots',component:LotsComponent}

];