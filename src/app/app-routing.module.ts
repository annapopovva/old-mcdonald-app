import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnimalsComponent } from './animals/animals.component';
import { CustomAnimalsComponent } from './custom-animals/custom-animals.component';


const routes: Routes = [

  {
    path: 'main',
    component: AnimalsComponent
  },
  {
    path: 'custom',
    component: CustomAnimalsComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
