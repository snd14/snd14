import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Paiementglobal } from 'src/app/models/paiementglobal';
import { ServicePaimentService } from 'src/app/services/service-paiment.service';
import jwt_decode from 'jwt-decode';

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
  idStructure:1;
  str=1;
  connectId;

  constructor(private keycloak : KeycloakService ,private router:Router,private servicepaiment:ServicePaimentService,private datepipe: DatePipe,
    private dateAdapter: DateAdapter<Date>) { 
      this.dateAdapter.setLocale('en-GB');
    }

  ngOnInit(): void {
    //this.getlistepaiement();
  }
  getlistepaiement(){
    //console.log(this.idStructure)
      
    let date1 =this.datepipe.transform(this.datedebut, 'dd-MM-yyyy');
    let date2 =this.datepipe.transform(this.datefin, 'dd-MM-yyyy');
    this.keycloak.getToken().then(data=>{
      
      this.connectId=data;
      var decode=jwt_decode(this.connectId)
      const map = new Map(Object.entries(decode));
      //const obj = Object.entries(map)
      this.idStructure=map.get('idBureau');   
      console.log(this.idStructure)  
     this.servicepaiment.getIdstructureparDate(this.str,date1,date2).subscribe(result=>{
    this.paiements=result; 
    
  });
  //console.log(this.idStructure);
    });
    
  //this.router.navigate(['/paiements/liste-paiment/'+this.datedebut+'/'+this.datefin]);

}
  
}
