export class Decaissement{
      id: number;
     version:number;
      Commentaires:String;
      date:Date;
      libelle:String;
      montant: number;
      retenue :number;
      TVAPaye:number;
      ninea:String;
   // @Column(nullable = true, length = 64)
      justificatif:string;
}