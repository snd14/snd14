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
import swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
//import { Facteur } from 'src/app/models/facteur';
import { KeycloakService } from 'keycloak-angular';
import { Budget } from 'src/app/models/Budget';
//import { debug } from 'console';
import { CompteBudget } from '../../models/CompteBudget';

declare var $: any;

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
tva:
number;
mois : number;
anne : number;
libelleM:string;
listMois:Mois[];
m=new Mois();
budget:any[];
infob:any[];
jsonBudget=[];
jsonBudget2:any;
list=[];
montant:number;
mont:number;
sony:number=0;
idStructure:number;
idBudget:number;
idB:number;
idLigne:number;
  connectId;
  constructor(private keycloak : KeycloakService ,private dataservice:DataserviceService, 
    private route : ActivatedRoute,
    private PaiementService:ServicePaimentService,
    private router:Router ) { 
      //this.getIdbudget();
      this.getMois();
      
      
     
  }

  ngOnInit(): void {
    
   // console.log(this.idStructure);
   this.getIdbudget();
   //this.getbudget();
  
     
   
     
    
    
    this.mois=this.route.snapshot.params['mois'];
    this.anne=this.route.snapshot.params['anne'];
    //console.log(this.montant);
    //this.appelrecherchpaiement();
    
    this.facteurs =[];
    this.paiements =[];
    //console.log(this.facteurs =[], this.anne);
    
    //this.rechercherPaiement(id);
   this.getMois();
    this.m=new Mois();
    
}
  
 
  getMois():void{//getMois pour recuperer le mois de paiement
  
    this.PaiementService.getAllMois().subscribe(data=>{
      this.listMois=data;
      
      //console.log(this.list);
     // this.listAnnee=data;
    });
    
  }
  getIdbudget(){
    
    this.keycloak.getToken().then(data=>{
      
      this.connectId=data;
      var decode=jwt_decode(this.connectId)
      const map = new Map(Object.entries(decode));
      //const obj = Object.entries(map)
      this.idStructure=map.get('idBureau');
    this.idStructure;
      this.PaiementService.getIdbudget(7,this.anne).subscribe(res =>{//(idStructure) deja regle
        this.infob=res;
        this.jsonBudget2=JSON.parse(JSON.stringify(this.infob));
       this.idBudget=this.jsonBudget2.id;
       
        
        this.rechercherPaiement(this.idStructure)
        console.log(this.idBudget);

    this.getbudget(this.idBudget)
      
      })
    });
  

  }
 
  getbudget(idbudet){//recuperation du budget
   // this.PaiementService.getIdbudget(7).subscribe(data =>{
      console.log(this.idBudget)
    this.PaiementService.getbudget(idbudet,64,4).subscribe(data =>{//idbudget,idcompte,idetat,
      this.budget=data;
      this.jsonBudget=JSON.parse(JSON.stringify(this.budget));
     
          this.montant=this.jsonBudget[0].montant;
         // this.idBudget=this.jsonBudget[0].id;
        
        if(!this.paiement.id &&this.montant<this.tva){
          this.showNotification('top', 'center')

        }         
          this.idLigne=this.budget[0].id;
          //console.log(this.mont);
        // console.log(this.mont);
         //console.log(this.idB);
         console.log(this.idBudget)
        console.log(this.montant);
       
        
      });
       // });
        
    
    //console.log(this.mont);
    
    
  }
 
 
rechercherPaiement(id){
    //var li=this.listMois.find(o=> o.id==2).libelle;
   // console.log(li);
   console.log(this.idStructure);
    this.PaiementService.searchPaiement(this.mois,this.anne,id).subscribe(res=>{
    this.paiement = res; 
   
  // this.list=JSON.parse(JSON.stringify(this.listMois));//conversion de la liste en
      this.libelleM=this.listMois[this.mois-1].libelle;
    console.log(this.libelleM);
    this.facteurs = this.paiement.facteurs
    //this.dataservice.paiement =this.paiement;
   this.p=this.paiement;
   for(let f of this.facteurs){
     let p = new Paiement()
     p.annee = this.paiement.annee;
     p.mois = this.paiement.mois;
   // console.log(p.mois);
     p.facteur =JSON.parse(JSON.stringify(f));
     
     p.montantHT = f.parametreFacteur.montantHt;
     p.montantTTC = f.parametreFacteur.montantTtc;
     p.tva = f.parametreFacteur.tva;
     p.remise = f.parametreFacteur.remise;
     p.netApayer = f.parametreFacteur.netAPayer;
      
    
     this.ps.push(p);
     let jsonobjet={}
     this.ps.forEach(item=>jsonobjet[item.tva]=item.remise)
    
     this.PaiementService.getAllMois().subscribe(data=>{
      this.listMois=data;
     // console.log(this.listMois[this.paiement.mois].libelle);
     
    });
    
   }

    //this.paiement.paiement = JSON.stringify(this.ps)
    this.montantTtc=this.p.facteurs.reduce((sum,current)=>sum+current.parametreFacteur.montantTtc,0);
    this.montantHt=this.p.facteurs.reduce((sum,current)=>sum+current.parametreFacteur.montantHt,0);
    this.netApayer=this.p.facteurs.reduce((sum,current)=>sum+current.parametreFacteur.netAPayer,0);
    this.remise=this.p.facteurs.reduce((sum,current)=>sum+current.parametreFacteur.remise,0);
    this.tva=this.p.facteurs.reduce((sum,current)=>sum+current.parametreFacteur.tva,0);

    
      //this.showNotification('top', 'center')}
      //this.router.navigate(['/paiements/rechercher-paiement/']);
    
      //this.notif(this.montant,this.montantTtc);
     // }; 

  });
  
    
}

  //this.showNotification('top', 'center')}

savePaiement(){
  console.log(this.idStructure);
  console.log(this.idBudget);
  console.log(this.montant);
  this.PaiementService.decaissement(this.idLigne,this.montant).subscribe(); //idligneBudget,montantrecuperer       
   //console.log(this.montant);
  //if(this.montant<this.montantTtc){//controle de la somme du budget
   
  //  this.showNotification('top', 'center')
  //}else{
  
  let pw=new Paiement_test();
  pw.idStructure=this.idStructure;
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
  this.PaiementService.searchPaiement(this.mois,this.anne,3).subscribe(res=>{
    this.paiementFacteur = res; });

}

showNotification(from: any, align: any) {
  const type = ['', 'success', 'warning', 'danger','info', 'rose', 'primary'];

 // const color = Math.floor((Math.random() * 6) + 1);

  $.notify({
      icon: 'notifications',
      message: '<b>Le montant est inferieur au montant doit payer </b> :'
  }, {
      type: type[3],
      timer: 3000,  
      placement: {
          from: from,
          align: align
      },
      template: '<div data-notify="container" class="col-xs-14 col-sm-6 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
      '</div>'
  });
}


}
