import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListeFacteurComponent } from './liste-facteur/liste-facteur.component';

export const FacteurRoutes: Routes = [{
  path: '',
  children:[{
    path: 'liste-facteur',
    component:ListeFacteurComponent
  }]
  
}];



