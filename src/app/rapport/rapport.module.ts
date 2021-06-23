import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { RapportRoutingModule, routePbureau } from './rapport-routing.module';
import { RapportParBureauComponent } from './rapport-par-bureau/rapport-par-bureau.component';
import { RapportDuBureauComponent } from './rapport-du-bureau/rapport-du-bureau.component';
import { MaterialModule } from '../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routePbureau } from './rapport-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ServicePaimentService } from '../services/service-paiment.service';


@NgModule({
  declarations: [RapportParBureauComponent, RapportDuBureauComponent],
  imports: [
    CommonModule,
    //RapportRoutingModule,
      MaterialModule,FormsModule,
      RouterModule.forChild(routePbureau),
      HttpClientModule,
      ReactiveFormsModule
    

  ],
  providers: [ServicePaimentService],
})
export class RapportModule { }
