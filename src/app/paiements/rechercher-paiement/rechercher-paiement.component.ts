import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mois } from 'src/app/models/mois';
import { Paiementglobal } from 'src/app/models/paiementglobal';
import { Searchpaiement } from 'src/app/models/searchpaiements';
import { ServicePaimentService } from 'src/app/services/service-paiment.service';
import { DataserviceService } from '../../services/dataservice.service';

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
  idStructure=1;
  

  listAnnee = [
    {value: '2018' , viewValue: '2018'},
    {value: '2019',viewValue: '2019'},
    {value: '2020',viewValue: '2020'},
    {value: '2021',viewValue: '2021'}
    
  ];
  
  constructor(private PaiementService:ServicePaimentService, private dataservice: DataserviceService,
              private formBuilder: FormBuilder, private router:Router) {
                  this.paiement=new Paiementglobal();

   }

  ngOnInit() {
    this.getMois();
    this.initForm();
    this.mois=new Mois();
  }

  getMois():void{
    this.PaiementService.getAllMois().subscribe(data=>{
      this.listMois=data;
      //debugger
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
     // this.PaiementService.searchPaiement(this.rechMoi,this.rechAnne,1).subscribe(res=>{
     // this.paiement = res; 
      
     // console.log(this.paiement)
     // this.dataservice.paiement =this.paiement;
      
      this.router.navigate(['/paiements/ajout-paiement/'+this.rechMoi+'/'+this.rechAnne+'/'+this.idStructure]);

    //});
      
      //debugger
  }
  




  

}
