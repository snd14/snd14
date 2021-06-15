import { Routes } from '@angular/router';
import { AuthGuard } from '../keycloak/authGarde';
//import { AuthGuard } from '../keycloak/authGarde';

import { DashboardComponent } from './dashboard.component';

export const DashboardRoutes: Routes = [
    {

      path: '',
      
      children: [ {
      path: 'dashboard',
      canActivate: [AuthGuard],
              
        component: DashboardComponent
    }]
}
];
