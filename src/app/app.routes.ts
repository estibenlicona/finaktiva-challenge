import { Routes } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard/PT5M', pathMatch: 'full' },
  { path: 'dashboard/:period', component: DashboardComponent },
];
