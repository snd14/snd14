import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable, { UserOptions } from 'jspdf-autotable';
import { Subject, Subscription } from 'rxjs';
import swal from 'sweetalert2';
import { Facteur } from 'src/app/models/facteur';
import { ServiceFacteurService } from 'src/app/services/service-facteur.service';
import { KeycloakService } from 'keycloak-angular';

declare var $: any;
interface jsPDFWithPlugin extends jsPDF{
  autotable:(options:UserOptions)=>jsPDF
}

@Component({
  selector: 'app-liste-facteur',
  templateUrl: './liste-facteur.component.html',
  styleUrls: ['./liste-facteur.component.css']
})
export class ListeFacteurComponent implements OnInit {
  facteurForm:FormGroup;
  pa_facteur:Facteur;
  facteurs:Facteur[];
  facte:Facteur;
  factas:Subscription;
  facteurSubject=new Subject<Facteur[]>();
  Libelle=[];
  libelleStructure=[];
  libellestr:number;
  id:number;
  donnee:Facteur;
  dataa:any;
  hasAccess;

  constructor(public keycloak: KeycloakService,private route: ActivatedRoute, 
    private router: Router,private formbuildFacteur:FormBuilder, 
    private serviceFacteur:ServiceFacteurService) { 
      this.pa_facteur=new Facteur()
                  this.facte=new Facteur();
                  this.donnee=new Facteur();
    }

  ngOnInit(): void {
    this.getFacteurs();
         this.getlibelleFacteur();
         this.initfacteurform();
         this.getidStructure();
  }
  initfacteurform(){
    this.facteurForm = this.formbuildFacteur.group({ 
      
      id:[null],
      nom:['',Validators.required],
      prenom:['',Validators.required],
      libelle:['',Validators.required],
      libellestr:[null],
     // libelleStructure:[''],
      active:[false,Validators.required]
      
    });

  }
  isDcp() {
    this.hasAccess = false
    if (this.keycloak.getUserRoles().includes("dcp-admin")) {
        this.hasAccess = true
    }

    return this.hasAccess


}
  getFacteurs():void{
    this.serviceFacteur.find().subscribe(data => {
      this.facteurs = data;
    });
  }
  getidStructure():void{
    this.serviceFacteur.getidStructure().subscribe(data => {
      this.libelleStructure=data;
      
      console.log(this.libelleStructure);
    });
   

  }
  txt:string="bonjour"
  transform(){
    //this.Idstructure=this.id;
  }
  upload(){
    let doc= new jsPDF();
    let col=[["id","nom","prenom","libelle","libelleStructure",]]
    let rows=[]
  for(let fact of this.facteurs)
  {
    let temp=[fact.id,fact.nom,fact.prenom,fact.libelle,fact.libelleStructure]
    rows.push(temp)
  }
    autoTable(doc,{
      startY:75,
      head:col,
      body:rows
    });
    doc.save("siny.pdf");
    
  }

  getlibelleFacteur():void{
    this.serviceFacteur.getlibelle().subscribe(data => {
      this.Libelle=data;
    });


  }
  onReset(){
    this.facteurForm.reset();
  }
 
   getfacteurbyId(facte){
    
        this.serviceFacteur.getfacteurbyId(facte.id).subscribe(result=>{
        this.donnee=result;
        this.dataa=this.donnee.libelleStructure;
       // this.id=this.facte.libelleStructure;
       console.log(this.dataa);
      // console.log(this.facte.libelleStructure);
      
        });
   
  }
    
  
   supprimer(factid:number) {
     
        this.serviceFacteur.delete(factid).subscribe(result => this.gotoList());
        
       // this.facteurSubject.next(this.facteurs.slice())
  

  }
   gotoList(){
  
        this.router.navigate(['/facteur/lister-facteur']);
        this.getFacteurs();
  }
    onSubmit(){
      const id = this.facteurForm.get('id').value;
    const nom = this.facteurForm.get('nom').value;
    const prenom = this.facteurForm.get('prenom').value; 
    const libelle = this.facteurForm.get('libelle').value; 
    const active = this.facteurForm.get('active').value;
    const libell = this.facteurForm.get('libellestr').value; 
   // const lib:number=libellestr;
   console.log(libell);
    const ffacteur=new Facteur()
    ffacteur.id=id;
    ffacteur.nom=nom;
    ffacteur.prenom=prenom;
    ffacteur.libelle=libelle;
    ffacteur.active=active;
    ffacteur.structureId=libell;
    
        this.serviceFacteur.save(ffacteur).subscribe(data => this.getFacteurs());
        
        //this.onReset();
        //this.messageAjout();
        this.showNotification('top','center');

    }
    gotoFacteurList(){
        this.router.navigate(['/facteur/lister-facteur']);
        
        this.getFacteurs();
        
  }
 
  update(){
    this.donnee.structureId=this.dataa;
  this.serviceFacteur.modifier(this.donnee).subscribe(data =>this.getFacteurs());;
    //this.message();
    this.getidStructure();
    this.showNotification('top','center') 
    console.log(this.donnee);
  }

  showNotification(from: any, align: any) {
    const type = ['', 'success', 'warning', 'danger','info', 'rose', 'primary'];

   // const color = Math.floor((Math.random() * 6) + 1);

    $.notify({
        icon: 'notifications',
        message: '<b>modification reussit</b> :'
    }, {
        type: type[1],
        timer: 2000,
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
  messageAjout(){
    swal.fire({
      title: "Good job!",
      text: "You clicked the button!",
      buttonsStyling: false,
      customClass:{
        confirmButton: "btn btn-success",
      },
      icon: "success"
  });

}
  
  
    message(){
      swal.fire({
        
          title: "enregistre!",
          text: "You clicked the button!",
          buttonsStyling: false,
          customClass:{
            confirmButton: "btn btn-success",
          },
          icon: "success"
      
  })
  
  }
   /* showSwal(fact) {
    
      swal({
          title: 'etes vous sure de supprimer?',
          text: 'prenom : '+fact.prenom +' et de nom: '+fact.nom,
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes!',
          cancelButtonText: 'No',
          confirmButtonClass: "btn btn-success",
          cancelButtonClass: "btn btn-danger",
          buttonsStyling: false
      }).then((result) => { 
        if (result.value) { 
          this.supprimer(fact.id)
          swal({ 
              title: 'Suppression reussit!',
              text: '',
              type: 'success',
              confirmButtonClass: "btn btn-success",
              buttonsStyling: false
          }).catch(swal.noop)
        } else {
          swal({
              title: 'suppression annule',
              text: '',
              type: 'error',
              confirmButtonClass: "btn btn-info",
              buttonsStyling: false
          }).catch(swal.noop)
        }
      
      })

   }*/
   showSwal(fact) {
   
    //if (type == 'warning-message-and-cancel') {
      swal.fire({
        title: 'etes vous sure de supprimer?',
          text: 'prenom : '+fact.prenom +' et de nom: '+fact.nom,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'supprimer',
          cancelButtonText: 'annuler',
          customClass:{
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
          },
          buttonsStyling: false
      }).then((result) => {
        if (result.value) {
          this.supprimer(fact.id)
          swal.fire({
              title: 'suppression!',
              text: '',
              icon: 'success',
              customClass:{
                confirmButton: "btn btn-success",
              },
              buttonsStyling: false
          });
        } else {
          swal.fire({
              title: 'Cancelled',
              text: 'Your imaginary file is safe :)',
              icon: 'error',
              customClass:{
                confirmButton: "btn btn-info",
              },
              buttonsStyling: false
          });
        }
      })

  

   }
   
   

}
