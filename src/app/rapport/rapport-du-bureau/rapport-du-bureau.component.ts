import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { Paiementglobal } from 'src/app/models/paiementglobal';
import { ServicePaimentService } from 'src/app/services/service-paiment.service';

@Component({
  selector: 'app-rapport-du-bureau',
  templateUrl: './rapport-du-bureau.component.html',
  styleUrls: ['./rapport-du-bureau.component.css']
})
export class RapportDuBureauComponent implements OnInit {
  datedebut:Date  ;
  datefin:Date ;
  paiements:Paiementglobal[];
  date1:Date;
  date2:Date;

  constructor(private router:Router,private servicepaiment:ServicePaimentService,private datepipe: DatePipe,
    private dateAdapter: DateAdapter<Date>) { 
      this.dateAdapter.setLocale('en-GB');
    }

  ngOnInit(): void {
    this.getlistepaiement();
  }
  getlistepaiement(){
      
    let date1 =this.datepipe.transform(this.datedebut, 'dd-MM-yyyy');
    let date2 =this.datepipe.transform(this.datefin, 'dd-MM-yyyy');     
     this.servicepaiment.getPaiementparDate(date1,date2).subscribe(result=>{
    this.paiements=result; 
    
  console.log(date1,date2);
    });
    
  //this.router.navigate(['/paiements/liste-paiment/'+this.datedebut+'/'+this.datefin]);

}

}
