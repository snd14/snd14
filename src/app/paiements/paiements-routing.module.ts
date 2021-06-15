import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjoutPaiementComponent } from './ajout-paiement/ajout-paiement.component';
import { ListePaimentComponent } from './liste-paiment/liste-paiment.component';
import { RechercheParDateComponent } from './recherche-par-date/recherche-par-date.component';
import { RechercherPaiementComponent } from './rechercher-paiement/rechercher-paiement.component';

export const paiementRoutes: Routes = [
  {
  path: '',
  children:[{
    path: 'ajout-paiement/:mois/:anne/:idStructure',
    component:AjoutPaiementComponent
  }]
},
  {
    path: '',
    children:[{
      path: 'rechercher-paiement',
      component:RechercherPaiementComponent
    }
]
},
{
  path: '',
  children:[{
    path: 'recherche-par-date',
    component:RechercheParDateComponent
  }
]
},{
  path: '',
  children:[{
    path: 'liste-paiment/:date1/:date2',
    component:ListePaimentComponent
  }
]
}];


