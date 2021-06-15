import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListeParametreComponent } from './liste-parametre/liste-parametre.component';

export const ParametreRoutes: Routes = [
  {
    path: '',
    children:[{
      path: 'liste-parametre',
      component:ListeParametreComponent
    }]
    
  }
]


export class ParametresRoutingModule { }
