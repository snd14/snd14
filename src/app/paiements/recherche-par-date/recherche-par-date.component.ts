import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { ServicePaimentService } from 'src/app/services/service-paiment.service';
import { Paiementglobal } from '../../models/paiementglobal';
import { Paiement_test } from '../../models/paiement_test';

@Component({
  selector: 'app-recherche-par-date',
  templateUrl: './recherche-par-date.component.html',
  styleUrls: ['./recherche-par-date.component.css']
})
export class RechercheParDateComponent implements OnInit {
  datedebut:Date  ;
  datefin:Date ;
  paiements:Paiementglobal[]=[];
  date1:Date;
  date2:Date;

  constructor(private router:Router,private servicepaiment:ServicePaimentService,private datepipe: DatePipe,
    private dateAdapter: DateAdapter<Date>) {
      this.dateAdapter.setLocale('en-GB');
     }

  ngOnInit(): void {
    this.getlistepaiement();
  }
  //rechercheParDate(datedebut,datefin){
    getlistepaiement(){
      
      let date1 =this.datepipe.transform(this.datedebut, 'dd-MM-yyyy');
      let date2 =this.datepipe.transform(this.datefin, 'dd-MM-yyyy');     
       this.servicepaiment.getPaiementparDate(date1,date2).subscribe(result=>{
      this.paiements=result;
    console.log(this.paiements);
      });
      
    //this.router.navigate(['/paiements/liste-paiment/'+this.datedebut+'/'+this.datefin]);
  
  }

}
