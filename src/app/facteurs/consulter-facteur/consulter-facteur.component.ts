import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Facteur } from 'src/app/models/facteur';
import { ServiceFacteurService } from 'src/app/services/service-facteur.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-consulter-facteur',
  templateUrl: './consulter-facteur.component.html',
  styleUrls: ['./consulter-facteur.component.css']
})
export class ConsulterFacteurComponent implements OnInit {
  facteurs:Facteur[];
  hasAccess
  idStructure:number;
  str=1;
  connectId;
  constructor(public keycloak: KeycloakService,private serviceFacteur:ServiceFacteurService) { }

  ngOnInit(): void {
    this.getFacteurs();
  }
  isDcp() {
    this.hasAccess = false
    if (this.keycloak.getUserRoles().includes("dcp-admin")) {
        this.hasAccess = true
    }

    return this.hasAccess


}
  getFacteurs():void{
    this.keycloak.getToken().then(data=>{
      
      this.connectId=data;
      var decode=jwt_decode(this.connectId)
      const map = new Map(Object.entries(decode));
      //const obj = Object.entries(map)
      this.idStructure=map.get('idBureau');   
      console.log(this.idStructure)  
    this.serviceFacteur.findbyid(this.idStructure).subscribe(data => {
      this.facteurs = data;
      console.log(this.facteurs);
    });
  });
  }

}
