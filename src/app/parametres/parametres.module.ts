import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametreRoutes, ParametresRoutingModule } from './parametres-routing.module';
import { ListeParametreComponent } from './liste-parametre/liste-parametre.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ServiceParametreService } from '../services/service-parametre.service';


@NgModule({
  declarations: [ ListeParametreComponent],
  imports: [
    CommonModule,
    FormsModule,MaterialModule,
    RouterModule.forChild(ParametreRoutes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ServiceParametreService],
})
export class ParametresModule { }
