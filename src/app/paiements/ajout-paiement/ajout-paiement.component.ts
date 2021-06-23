import { Component, OnInit, ɵsetCurrentInjector } from '@angular/core';
import { sum } from 'chartist';
import { ServicePaimentService } from 'src/app/services/service-paiment.service';
import { Paiementglobal } from '../../models/paiementglobal';
import { DataserviceService } from '../../services/dataservice.service';
import { Paiement } from '../../models/paiement';
import { Facteur } from '../../models/facteur';
import { Router, ActivatedRoute } from '@angular/router';
import { Paiement_test } from '../../models/paiement_test';
import { Mois } from 'src/app/models/mois';

@Component({
  selector: 'app-ajout-paiement',
  templateUrl: './ajout-paiement.component.html',
  styleUrls: ['./ajout-paiement.component.css']
})
export class AjoutPaiementComponent implements OnInit {
paiement:Paiementglobal;
paiementFacteur:Paiementglobal;
ps : any[] =[];
facteurs :any[]
paiements :any[];
facteur:any
fact : any[];
p:Paiementglobal;
montantTtc:number;
montantHt:number;
netApayer:number;
remise:number;
tva:number;
mois : number;
anne : number;

  constructor(private dataservice:DataserviceService, 
    private route : ActivatedRoute,
    private PaiementService:ServicePaimentService,
    private router:Router ) { 
  
  }

  ngOnInit(): void {
    this.mois=this.route.snapshot.params['mois'];
    this.anne=this.route.snapshot.params['anne'];
  
    this.facteurs =[];
    this.paiements =[];
    //console.log(this.facteurs =[], this.anne);
    this.rechercherPaiement();
    //debugger
  }
 
  rechercherPaiement(){
        this.PaiementService.searchPaiement(this.mois,this.anne,1).subscribe(res=>{
    this.paiement = res; 
    this.facteurs = this.paiement.facteurs
    //this.dataservice.paiement =this.paiement;
   this.p=this.paiement;
   for(let f of this.facteurs){
     let p = new Paiement()
     p.annee = this.paiement.annee;
     p.mois = this.paiement.mois;
   // console.log(p.annee);
     p.facteur =JSON.parse(JSON.stringify(f));
     
     p.montantHT = f.parametreFacteur.montantHt;
     p.montantTTC = f.parametreFacteur.montantTtc;
     p.tva = f.parametreFacteur.tva;
     p.remise = f.parametreFacteur.remise;
     p.netApayer = f.parametreFacteur.netAPayer;
      
    
     this.ps.push(p);
     let jsonobjet={}
     this.ps.forEach(item=>jsonobjet[item.tva]=item.remise)
    
   
    
   }

    //this.paiement.paiement = JSON.stringify(this.ps)
    this.montantTtc=this.p.facteurs.reduce((sum,current)=>sum+current.parametreFacteur.montantTtc,0);
    this.montantHt=this.p.facteurs.reduce((sum,current)=>sum+current.parametreFacteur.montantHt,0);
    this.netApayer=this.p.facteurs.reduce((sum,current)=>sum+current.parametreFacteur.netAPayer,0);
    this.remise=this.p.facteurs.reduce((sum,current)=>sum+current.parametreFacteur.remise,0);
    this.tva=this.p.facteurs.reduce((sum,current)=>sum+current.parametreFacteur.tva,0);


  });
    
    
}
savePaiement(){
  
  let pw=new Paiement_test();
  pw.idStructure=1;
  pw.netapayer = this.netApayer;
  pw.totalRemise = this.remise;
  pw.totalMontantHt = this.montantHt;
  pw.totaltva = this.tva;
  pw.totalTtc = this.montantTtc;
  pw.annee=this.paiement.annee;
  pw.mois=this.paiement.mois;
  
  pw.paiement=  []
  pw.paiement=JSON.parse(JSON.stringify(this.ps));

  
   


  this.PaiementService.save(pw).subscribe(data=>{
    this.paiement= data;
    
var date2 = new Date();
   // console.log(date2.getDay);
    
  });
 
}
payer(){
//  this.router.navigate(['/facteurs/liste-facteur'])
  this.PaiementService.searchPaiement(this.mois,this.anne,1).subscribe(res=>{
    this.paiementFacteur = res; });

}



}
