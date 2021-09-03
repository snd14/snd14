import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mois } from '../models/mois';
import { Paiementglobal } from '../models/paiementglobal';
import { Paiement_test } from '../models/paiement_test';
import { CompteBudget } from '../models/CompteBudget';
import { Decaissement } from '../models/Decaissement';
import { Budget } from '../models/Budget';

@Injectable({
  providedIn: 'root'
})
export class ServicePaimentService {


  paiements:Paiementglobal[];
  user : Paiementglobal;
 // url2='http:///10.12.15.193:9000/api/paiementGlobal';
 private url:string='http://localhost:9091/';
 private url1:string;
 private url2:string;
 private url3:string;
 private url4:string;
  

constructor(private http: HttpClient) {
  this.url1=this.url.concat("apiLigneBudget/budgetUnCompte/");
  this.url2=this.url.concat("apiDecaissement/addDecaissement/");
  this.url3=this.url.concat("apiBudget/budget");
  this.url4=this.url.concat("apiBudget/annees");

 }
    
    //afficher les infos de la base de donnée
    public getPaiement():Observable<Paiementglobal[]>{
      return this.http.get<Paiementglobal[]>(environment.apiUrl+'mois/');
    }

    //liste paiement global 
    public getAllPaiements():Observable<Paiementglobal[]>{
      return this.http.get<Paiementglobal[]>(environment.apiUrl+'paiementGlobal');
    }

    //moi paiement 
    public getAllMois():Observable<Mois[]>{
      
      return this.http.get<Mois[]>(environment.apiUrl+'mois/');
    }
    public getAllannee(Idstructure:number):Observable<any[]>{
      
      return this.http.get<Budget[]>(this.url4+"/"+Idstructure);
    }
    //recuperer le budget
    public getbudget(idBudget:number,num:number,idetat:number):Observable<any[]>{
      return this.http.get<CompteBudget[]>(this.url1+"/"+idBudget+"/"+num+"/"+idetat)

    }
    //recuperer le idBudget
    public getIdbudget(Idstructure:number,annee:number):Observable<any[]>{
      return this.http.get<Budget[]>(this.url3+"/"+Idstructure+'/'+annee)
    }
    public decaissement(idLigne:number,montant:number){
      return this.http.post<Decaissement>(this.url2+'/'+idLigne+'/'+montant,montant);

    }
    
    //rechercher paiement 
    public searchPaiement(mois:number,annee:number,idstructure:number){

      const urls = `${environment.apiUrl+'paiementGlobal'}/${mois}/${annee}/${idstructure}`; 
        
      return this.http.get<Paiementglobal>(urls);
    }
    public getidStructure():Observable<any[]>{
      return this.http.get<any[]>(environment.apiUrl+'structure');
    }
  
    public getPaiementparDate(date1:string,date2:string):Observable<Paiementglobal[]>{
      
            //const urls2 = `${environment.apiUrl+'paiement/'+'date1/'+'date2'}/${date1}/${date2}`; 
      return this.http.get<Paiementglobal[]>(environment.apiUrl+'paiement/'+date1+'/'+date2);
      
    }
    public getIdstructureparDate(idStructure:number,date1:string,date2:string):Observable<Paiementglobal[]>{
      
      //const urls2 = `${environment.apiUrl+'paiement/'+'date1/'+'date2'}/${date1}/${date2}`; 
return this.http.get<Paiementglobal[]>(environment.apiUrl+'paiement/'+idStructure+'/'+date1+'/'+date2);

}

    //liste paiement 
    listePaiement():Paiementglobal[]{
      return this.paiements;
    }

    //ajouter un paiement dans la base de donnée
    addPaiement(p:Paiementglobal){
      return this.http.post(environment.apiUrl+'mois/', p); 
    }

    //supprimer des infos dans la base de donnée
    deletPaiement(p:Paiementglobal){
      return this.http.delete(environment.apiUrl+'mois/'+p);
    }

    //mettrre  à jour le paiement 
    UpdatePaiement(p:Paiementglobal){
    return this.http.put(environment.apiUrl+'mois/',p);
    }
    public save(paie:Paiement_test) {
      
     
      return this.http.post<Paiementglobal>(environment.apiUrl+'paiementGlobal', paie);
      //console.log(paie)
    }
}
