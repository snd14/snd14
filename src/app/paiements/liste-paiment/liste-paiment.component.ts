import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicePaimentService } from 'src/app/services/service-paiment.service';
import { Paiementglobal } from '../../models/paiementglobal';

@Component({
  selector: 'app-liste-paiment',
  templateUrl: './liste-paiment.component.html',
  styleUrls: ['./liste-paiment.component.css']
})
export class ListePaimentComponent implements OnInit {
  date1: Date;
  date2:Date;
  paie:any;

  constructor(private route:ActivatedRoute ,private servicepaiment:ServicePaimentService ) { }

  ngOnInit(): void {
    this.date1=this.route.snapshot.params['date1'] ;
    this.date2=this.route.snapshot.params['date2'] ;

    this.getlistepaiement();
    //debugger
  }
  getlistepaiement(){
    console.log(this.date1, this.date2);
    //this.servicepaiment.getPaiementparDate(this.date1 ,this.date2).subscribe(result=>{
    //this.paie=result;
    console.log(this.paie);
  debugger;
  //  });
    

}

}
