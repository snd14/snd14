import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Facteur } from '../models/facteur';

@Injectable({
  providedIn: 'root'
})
export class ServiceFacteurService {
  facts:Facteur[];
  facte:Facteur;
  Libelle :string[];
  private url1:string;
  private url2:string;
  private url3:string;
  private url4:string;
  private url5:string;
  facteurSubject=new Subject<Facteur[]>()

  constructor(private http: HttpClient) {
    this.url1 = 'http://10.12.15.193:9000/api/facteur';
    this.url2 = 'http://10.12.15.193:9000/api/facteurs';
    this.url3 = 'http://10.12.15.193:9000/api/facteur/';
    this.url4='http://10.12.15.193:9000/api/parametre';
    this.url5='http://10.12.15.193:9000/api/structure';
   }
   public find(): Observable<Facteur[]> {
    return this.http.get<Facteur[]>(environment.apiUrl+'facteurs');
  }

  public save(pa_facteur: Facteur) {
    return this.http.post<Facteur>(environment.apiUrl+'facteur', pa_facteur);
  }
  public delete(factid: number) {
    return this.http.delete<Facteur>(environment.apiUrl+'facteur/'+factid);
  }
  public getlibelle():Observable<string[]>{
    return this.http.get<string[]>(environment.apiUrl+'parametre');
  }
  public getidStructure():Observable<string[]>{
    return this.http.get<string[]>(environment.apiUrl+'structure');
  }

  public getfacteurbyId(facte:number):Observable<Facteur>{
      return this.http.get<Facteur>(environment.apiUrl+'facteur/'+facte);
    }
    public modifier(facte: Facteur){
      return this.http.put<Facteur>(environment.apiUrl+'facteur', facte)

       
    }
}
