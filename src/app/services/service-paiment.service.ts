import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mois } from '../models/mois';
import { Paiementglobal } from '../models/paiementglobal';
import { Paiement_test } from '../models/paiement_test';

@Injectable({
  providedIn: 'root'
})
export class ServicePaimentService {


  paiements:Paiementglobal[];
  user : Paiementglobal;
  url2='http:///10.12.15.193:9000/api/paiementGlobal';
  url='http://10.12.15.193:9000/api/mois/';
  
constructor(private http: HttpClient) { }
    
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
    
    //rechercher paiement 
    public searchPaiement(mois:number,annee:number,idstructure:number){

      const urls = `${environment.apiUrl+'paiementGlobal'}/${mois}/${annee}/${idstructure}`; 
        
      return this.http.get<Paiementglobal>(urls);
    }
    public getPaiementparDate(date1:string,date2:string):Observable<Paiementglobal[]>{
      
      
      
      
      //const urls2 = `${environment.apiUrl+'paiement/'+'date1/'+'date2'}/${date1}/${date2}`; 
      return this.http.get<Paiementglobal[]>(environment.apiUrl+'paiement/'+date1+'/'+date2);
      
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
    save(paie:Paiement_test) {
      
     
      return this.http.post<Paiementglobal>(environment.apiUrl+'paiementGlobal', paie);
      //console.log(paie)
    }
}
