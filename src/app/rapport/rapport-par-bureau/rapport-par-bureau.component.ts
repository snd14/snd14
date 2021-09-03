import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Paiementglobal } from 'src/app/models/paiementglobal';
import { ServicePaimentService } from 'src/app/services/service-paiment.service';
import jwt_decode from 'jwt-decode';
import { ServiceFacteurService } from 'src/app/services/service-facteur.service';
//import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';

@Component({
  selector: 'app-rapport-par-bureau',
  templateUrl: './rapport-par-bureau.component.html',
  styleUrls: ['./rapport-par-bureau.component.css']
})
export class RapportParBureauComponent implements OnInit {
  
  datedebut:Date  ;
  datefin:Date ;
  paiements:Paiementglobal[];
  date1:Date;
  date2:Date;
  date3:Date;
  date4:Date;
  libelleStructure;
  libellestr:number;
  
  constructor(private keycloak : KeycloakService ,private router:Router,private servicepaiment:ServicePaimentService,private datepipe: DatePipe,
    private dateAdapter: DateAdapter<Date>) {
      this.dateAdapter.setLocale('en-GB');
     // this.nav.decode;
      //console.log(this.nav.decode);
     // this.getidStructure();
      //
      this.keycloak.loadUserProfile(true).then(res =>{

        // this.email=res.email
       // this.connectId=res.firstName;
        //debugger
        
        //console.log(res);
    });
    
     }

  ngOnInit(): void {
    
   
    this.getidStructure();
   
   

    //console.log(this.idStructure)
  }
 
  
  getlistepaiement(){
      
    let date1 =this.datepipe.transform(this.datedebut, 'dd-MM-yyyy');
    let date2 =this.datepipe.transform(this.datefin, 'dd-MM-yyyy');     
     this.servicepaiment.getIdstructureparDate(this.libellestr,date1,date2).subscribe(result=>{
    this.paiements=result; 
    
  console.log(date1,date2);
    });
    
  //this.router.navigate(['/paiements/liste-paiment/'+this.datedebut+'/'+this.datefin]);

}
getidStructure():void{
  this.servicepaiment.getidStructure().subscribe(data => {
    this.libelleStructure=data;
    
    console.log(this.libelleStructure);
  });
 

}

methode(){
 
  
  //this.ngOnInit();
    //debugger
    //console.log(this.idStructure);


}

 

}
