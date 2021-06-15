import { Paiement } from './paiement';
import { Facteur } from './facteur';
export class Paiementglobal {
    id: number;
    idStructure: number;
    libelleStructure: String;
    mois: number;
    annee: number;
    datepaie: Date;
    netapayer: number;
    totaltva: number;
    totalMontantHt: number;
    totalRemise: number;
    totalTtc: number;
    paiement: any;    
   // facteur:Facteur[];
    facteurs:any;
  }