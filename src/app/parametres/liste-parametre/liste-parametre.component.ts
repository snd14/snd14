import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Parametre } from '../../models/parametre';
import { Subject,Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { ServiceParametreService } from 'src/app/services/service-parametre.service';
import swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
declare var $: any;

@Component({
  selector: 'app-liste-parametre',
  templateUrl: './liste-parametre.component.html',
  styleUrls: ['./liste-parametre.component.css']
})
export class ListeParametreComponent implements OnInit {
  parametreForm:FormGroup
  parametres:Parametre[];
  pa_parametre:Parametre;
  params:Parametre;
  parametr:Parametre;
  donnee:Parametre;

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private servicePrametre:ServiceParametreService,
    private formbuildParam:FormBuilder) { 
      this.pa_parametre=new Parametre();
     this.params=new Parametre();
    }

  ngOnInit() {
    this.getParametres();
    this.parametreform();
    
    //this.params=null;

    
 // this.getParametrebyId(this.params.id);
  
  }
  parametreform(){
    this.parametreForm = this.formbuildParam.group({ 
      
      id:[null],
      libelle:['',Validators.required],
      montantHt:[null,Validators.required],
      montantTtc:[null,Validators.required],
      netAPayer:[null,Validators.required],
      remise:[null,Validators.required],
      tva:[null,Validators.required],
    });

  }
  getParametrebyId(parame){
  
    this.servicePrametre.getParametrebyId(parame.id).subscribe(result=>{
    this.params=result;
   // this.donnee=this.params;
    
    debugger
    console.log(this.params.libelle)
    });
    
    
    
  }
  getParametres():void{
    this.servicePrametre.find().subscribe(data => {
      this.parametres = data;
    });
  }
  upload(){
    let doc= new jsPDF();
    let col=[["id","libelle","montantHt" ,"montantTtc","netAPayer","remise","tva"]]
    let rows=[]
  for(let param of this.parametres)
  {
    let temp=[param.id,param.libelle,param.montantHt,param.montantTtc,param.netAPayer,param.remise,param.tva]
    rows.push(temp)
  }
    autoTable(doc,{
      startY:75,
      head:col,
      body:rows
    });
    doc.save("siny.pdf");
    
  }

  onSubmit(){
  //  const title = this.bookForm.get('title')!.value;
   // const formValue = this.parametreForm.get('email')!.value;;
   // const newParametre = new Parametre(
    //const id = this.parametreForm.get('id').value;
    const libelle = this.parametreForm.get('libelle').value;
    const montantHt = this.parametreForm.get('montantHt').value;
    const montantTtc = this.parametreForm.get('montantTtc').value; 
    const netAPayer = this.parametreForm.get('netAPayer').value; 
    const remise = this.parametreForm.get('remise').value; 
    const tva = this.parametreForm.get('tva').value;
    const pparametre=new Parametre ()
    pparametre.libelle=libelle;
    pparametre.montantHt=montantHt;
    pparametre.montantTtc=montantTtc;
    pparametre.netAPayer=netAPayer;
    
    pparametre.remise=remise;
    pparametre.tva=tva;
     
    
    this.servicePrametre.save(pparametre).subscribe(result => this.getParametres());
    this.showNotification('top','center');
    //this.getParametres();
   
}
supprimer(paramid:number) {
     
  this.servicePrametre.delete(paramid).subscribe(result => this.gotoParamList());
  this.getParametres();
  this.message();
  
 // this.facteurSubject.next(this.facteurs.slice())

 
}
gotoParamList(){
  this.router.navigate(['/parametres/liste-parametre']);
  this.getParametres();
}

showParam(){
  //this.getParametrebyId
}
update(){
  this.servicePrametre.modifier(this.params).subscribe(data =>this.gotoParamList());
 //this.message();
 this.showNotification('top','center');
}
//la notification apres une modification
showNotification(from: any, align: any) {
  const type = ['','success'];

  //const color='primary';

  $.notify({
     icon: 'notifications',
      message: '<b> Reussit</b> :'
  }, {
      type: type[1],
      timer: 200,
      placement: {
          from: from,
          align: align
      },
      template: '<div data-notify="container" class="col-xs-14 col-sm-6 alert alert-{0} alert-with-icon success" role="alert">' +
        '<button mat-raised-button btn btn-success type="button-success" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span style="text-align:center" data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
      '</div>'
  });
}
//message de success
message(){
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
showSwal(param) {
   
  //if (type == 'warning-message-and-cancel') {
    swal.fire({
      title: 'etes vous sure de supprimer?',
        text: 'You will not be able to recover this imaginary file!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
        customClass:{
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false
    }).then((result) => {
      if (result.value) {
        this.supprimer(param.id)
        swal.fire({
            title: 'Deleted!',
            text: 'Your imaginary file has been deleted.',
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
