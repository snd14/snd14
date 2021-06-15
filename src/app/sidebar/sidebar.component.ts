import { Component, OnInit } from '@angular/core';
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
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
   
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard',
        
    },{
        path: '/components',
        title: 'Components',
        type: 'sub',
        icontype: 'apps',
        collapse: 'components',
        children: [
            {path: 'buttons', title: 'Buttons', ab:'B'}
            
        ]
    },
    {
        path: '/parametres',
        title: 'Parametres',
        type: 'sub',
        icontype: 'apps',
        collapse: 'parametres',
        children: [
            {path: 'liste-parametre' , title: 'liste parametre' ,ab:'L'}
          //  {path: 'modifier-facteur', title: 'modification facteurs', ab:'M'},
            
        ]
    },
    {
        path: '/facteurs',
        title: 'Facteurs',
        type: 'sub',
        icontype: 'apps',
        collapse: 'facteurs',
        children: [
            {path: 'liste-facteur', title: 'liste facteurs', ab:'L'}
            //{path: 'modifier-facteur', title: 'modification facteurs', ab:'M'},
            
        ]
    },
    {
        path: '/paiements',
        title: 'Paiements',
        type: 'sub',
        icontype: 'apps',
        collapse: 'paiements',
        children: [
            {path: 'ajout-paiement', title: 'ajout paiement', ab:'A'},
            {path: 'rechercher-paiement', title: 'rechercher paiement', ab:'R'},
            {path: 'recherche-par-date', title: 'recherche ', ab:'R'},
            {path: 'liste-paiment', title: 'liste des paiement  ', ab:'L'}
            //{path: 'modifier-facteur', title: 'modification facteurs', ab:'M'},
            
        ]
    },
];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ps: any;
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            this.ps = new PerfectScrollbar(elemSidebar);
        }
    }
    updatePS(): void  {
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
}
