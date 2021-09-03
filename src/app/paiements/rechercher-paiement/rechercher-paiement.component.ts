import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mois } from 'src/app/models/mois';
import { Paiementglobal } from 'src/app/models/paiementglobal';
import { Searchpaiement } from 'src/app/models/searchpaiements';
import { ServicePaimentService } from 'src/app/services/service-paiment.service';
import { DataserviceService } from '../../services/dataservice.service';
import jwt_decode from 'jwt-decode';
import swal from 'sweetalert2';
import { KeycloakService } from 'keycloak-angular';
//import { Facteur } from 'src/app/models/facteur';

declare var $: any;
@Component({
  selector: 'app-rechercher-paiement',
  templateUrl: './rechercher-paiement.component.html',
  styleUrls: ['./rechercher-paiement.component.css']
})
export class RechercherPaiementComponent implements OnInit {
  searchForm: FormGroup;
  paiement:Paiementglobal
  listMois:Mois[];
  mois= new Mois();
  searchpaiement:Searchpaiement;
  message=false;
  paiements:Paiementglobal;
  rechMoi: number;
  rechAnne: number;
  //idStructure=1;
  jsonPaiement=[];
  ltAnnee:any;
  annee:number;
  idStructure:number;
  connectId;

  listAnnee = [
    {value: '2018' , viewValue: '2018'},
    {value: '2019',viewValue: '2019'},
    {value: '2020',viewValue: '2020'},
    {value: '2021',viewValue: '2021'},
    {value: '2022',viewValue: '2022'}
    
  ];
  
  constructor(private keycloak : KeycloakService,private PaiementService:ServicePaimentService, private dataservice: DataserviceService,
              private formBuilder: FormBuilder, private router:Router) {
                  this.paiement=new Paiementglobal();

   }

  ngOnInit() {
    this.getMois();
    this.initForm();
    this.mois=new Mois();
    this.getAnnee();
  }

  getMois():void{
    //debugger
    this.PaiementService.getAllMois().subscribe(data=>{
      this.listMois=data;
    
     // this.listAnnee=data;
    });
    
  }
  getAnnee():void{
    //debugger
    this.keycloak.getToken().then(data=>{
      
      this.connectId=data;
      var decode=jwt_decode(this.connectId)
      const map = new Map(Object.entries(decode));
      //const obj = Object.entries(map)
      this.idStructure=map.get('idBureau');
    this.PaiementService.getAllannee(7).subscribe(data=>{
      this.ltAnnee=data;
      
      console.log(this.ltAnnee);
      
    });
     // this.listAnnee=data;
    });
    
  }

  initForm(){
    this.searchForm =  this.formBuilder.group({
      mois: ['', Validators.required],
      annees :['', Validators.required]
    });
  }

  rechercherPaiement(rechMoi,rechAnne,idStructure){
      this.PaiementService.searchPaiement(this.rechMoi,this.rechAnne,this.idStructure).subscribe(res=>{
      this.paiement = res; 
      
     // console.log(this.paiement.facteurs)
     if(this.paiement.facteurs==null){
      this.showNotification('top', 'center')
     }else{
      
      this.router.navigate(['/paiements/ajout-paiement/'+this.rechMoi+'/'+this.rechAnne+'/'+this.idStructure]);
      
     }
    });
      
      
  }
  showNotification(from: any, align: any) {
    const type = ['', 'success', 'warning', 'danger','info', 'rose', 'primary'];
  
   // const color = Math.floor((Math.random() * 6) + 1);
  
    $.notify({
        icon: 'notifications',
        message: '<b>veuillez verifier le mois ou lannee</b> :'
    }, {
        type: type[3],
        timer: 4000,
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
