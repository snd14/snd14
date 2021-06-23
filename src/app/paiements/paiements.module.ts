import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { paiementRoutes} from './paiements-routing.module';
import { RechercherPaiementComponent } from './rechercher-paiement/rechercher-paiement.component';
import { AjoutPaiementComponent } from './ajout-paiement/ajout-paiement.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../app.module';
import { ServicePaimentService } from '../services/service-paiment.service';
//import { RechercheParDateComponent } from './recherche-par-date/recherche-par-date.component';
import { ListePaimentComponent } from './liste-paiment/liste-paiment.component';


@NgModule({
  declarations: [RechercherPaiementComponent, AjoutPaiementComponent, ListePaimentComponent],
  imports: [
    CommonModule,MaterialModule,FormsModule,
    RouterModule.forChild(paiementRoutes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ServicePaimentService],
})
export class PaiementsModule { }
