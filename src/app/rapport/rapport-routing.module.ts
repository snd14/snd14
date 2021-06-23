import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RapportDuBureauComponent } from './rapport-du-bureau/rapport-du-bureau.component';
import { RapportParBureauComponent } from './rapport-par-bureau/rapport-par-bureau.component';
//export const paiementRoutes: Routes = [
export const routePbureau: Routes = [
  {
    path: '',
    children:[{
      path: 'rapport-du-bureau',
      component:RapportDuBureauComponent
    }]
  
  },{
    path: '',
    children:[{
      path: 'rapport-par-bureau',
      component:RapportParBureauComponent
    }]
  
  },

];


