import { Injectable } from '@angular/core';
import { Paiementglobal } from '../models/paiementglobal';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  public paiement:Paiementglobal;

}
