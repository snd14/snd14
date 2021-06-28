import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import PerfectScrollbar from 'perfect-scrollbar';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
    role?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{

    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'dashboard',

},
{
    path: '/paiements',
    title: 'Paiements',
    type: 'sub',
    icontype: 'euro',
    collapse: 'paiements',
    children: [
        // {path: 'ajout-paiement', title: 'ajout paiement', ab:'A',role:'dcp-admin'},
        { path: 'rechercher-paiement', title: 'rechercher paiement', ab: 'R', role: 'receveur' },


        //{path: 'modifier-facteur', title: 'modification facteurs', ab:'M'},

    ]
}, {
    path: '/facteurs',
    title: 'Facteurs',
    type: 'sub',
    icontype: 'group',
    collapse: 'facteurs',
    children: [
        { path: 'liste-facteur', title: 'liste facteurs', ab: 'L', role: 'dcp-admin' }
        //{path: 'modifier-facteur', title: 'modification facteurs', ab:'M'},

    ]
}, {
    path: '/parametres',
    title: 'Parametrage',
    type: 'sub',
    icontype: 'settings',
    collapse: 'parametres',
    children: [
        { path: 'liste-parametre', title: 'parametrage Facteur', ab: 'P', role: 'dcp-admin' }
        //  {path: 'modifier-facteur', title: 'modification facteurs', ab:'M'},

    ]
},

{
    path: '/rapport',
    title: 'Rapport',
    type: 'sub',
    icontype: 'book',
    collapse: 'rapport',
    children: [
        { path: 'rapport-du-bureau', title: 'rapport du bureau', ab: 'A', role: 'receveur' },
        { path: 'rapport-par-bureau', title: 'rapport par bureau', ab: 'R', role: 'drp-admin' },
        // {path: 'recherche-par-date', title: 'recherche ', ab:'R'},
        // {path: 'liste-paiment', title: 'liste des paiement  ', ab:'L'}
        //{path: 'modifier-facteur', title: 'modification facteurs', ab:'M'},

    ]
},
];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    listrole;
    hasAccess;

    public menuItems: any[];
    ps: any;
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    tok;

    public constructor(public keycloak: KeycloakService, public route: ActivatedRoute) {





        console.log("routeinfo: " + ROUTES[2].children[0].path)


    }

    gestionUtil(rolearray: Array<String>) {
        console.log(this.listrole)
        let menut = true
        const length = rolearray.length - 1
        console.log(length)
        if (typeof this.listrole === "object") {
            let taille = this.listrole.length - 1
            for (let i = 0; i <= length; i++) {
                for (let j = 0; j <= taille; j++) {
                    console.log(rolearray[i])
                    //if(testlist.find(role=>role===rolearray[i])!=undefined){
                    if (this.listrole[j] === rolearray[i]) {
                        menut = false
                        console.log('found ya')
                    }

                }
            }
        }
        else if (typeof this.listrole != "object") {
            for (let i = 0; i <= length; i++) {
                if (this.listrole === rolearray[i]) {
                    menut = false
                    console.log('found ya')
                }
            }
        }
        return menut

    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            this.ps = new PerfectScrollbar(elemSidebar);
            //console.log(this.isDrp());
            // console.log(this.keycloak.getUserRoles())//.includes("drp-admin"))
        }
    }
    updatePS(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            this.ps.update();
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
    isDcp() {
        this.hasAccess = false
        if (this.keycloak.getUserRoles().includes("dcp-admin")) {
            this.hasAccess = true
        }

        return this.hasAccess


    }
    isReceveur() {
        this.hasAccess = false
        if (this.keycloak.getUserRoles().includes("receveur")) {
            this.hasAccess = true
        }

        return this.hasAccess


    }

    isDrp() {
        this.hasAccess = false
        if (this.keycloak.getUserRoles().includes("drp-admin")) {
            this.hasAccess = true
        }

        return this.hasAccess


    }

}
