import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacteurRoutes } from './facteurs-routing.module';
import { ListeFacteurComponent } from './liste-facteur/liste-facteur.component';
import { MaterialModule } from '../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ServiceFacteurService } from '../services/service-facteur.service';


@NgModule({
  declarations: [ListeFacteurComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild(FacteurRoutes),
    HttpClientModule,ReactiveFormsModule
  ],
  providers: [ServiceFacteurService],
})
export class FacteursModule { }
