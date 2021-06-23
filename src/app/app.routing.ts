import { Routes,CanActivate } from '@angular/router';
//import { AuthGuard } from './authGard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './keycloak/authGarde';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'dashboard',canActivate: [AuthGuard],
   }, 
{
      path: '',
      component: AdminLayoutComponent,
      children: [
          {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
    },
    {
        path: 'facteurs',
        loadChildren: './facteurs/facteurs.module#FacteursModule'
    },
    {
      path: 'paiements',
      loadChildren: './paiements/paiements.module#PaiementsModule'
  },
  {
    path: 'rapport',
    loadChildren: './rapport/rapport.module#RapportModule'
},
    {
        path: 'parametres',
        loadChildren: './parametres/parametres.module#ParametresModule'
    } ,{
        path: 'forms',
        loadChildren: './forms/forms.module#Forms'
    }, {
        path: '',
        loadChildren: './userpage/user.module#UserModule'
    }, {
        path: '',
        loadChildren: './timeline/timeline.module#TimelineModule'
    }
  ]}, {
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule'
      }]
    }
];
