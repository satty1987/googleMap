import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgmcomponentComponent } from './components/agmcomponent/agmcomponent.component';
import { TheaterComponent } from './components/theater/theater.component';


const routes: Routes = [
  { path: '', component: AgmcomponentComponent },
  { path: 'seats', component: TheaterComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

