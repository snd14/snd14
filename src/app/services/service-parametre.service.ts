import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Parametre } from '../models/parametre';

@Injectable({
  providedIn: 'root'
})
export class ServiceParametreService {
  private url1:string;
  private url2:string;
  private url3:string;

  constructor(private http: HttpClient) {
    this.url1 = 'http://10.12.15.193:9000/api/parametre';
    this.url2 = 'http://10.12.15.193:9000/api/parametre';
    this.url3 = 'http://10.12.15.193:9000/api/parametre/';
   }
   public find(): Observable<Parametre[]> {
    return this.http.get<Parametre[]>(environment.apiUrl+'parametre');
  }
  public save(pa_parametre: Parametre) {
    return this.http.post<Parametre>(environment.apiUrl+'parametre', pa_parametre);
  }
  public delete(paramid: number) {
    return this.http.delete<Parametre>(environment.apiUrl+'parametre/'+paramid);
  }
  public getParametrebyId(params:number):Observable<Parametre>{
    return this.http.get<Parametre>(environment.apiUrl+'parametre/'+params);
  }
  public modifier(params: Parametre){
    return this.http.put<Parametre>(environment.apiUrl+'parametre', params)

     
  }
}
