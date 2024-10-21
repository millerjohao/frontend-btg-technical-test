import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PageNotFoundComponent } from './shared/pages/page-not-found/page-not-found/page-not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { FundsComponent } from './pages/funds/funds.component';
import { HistoryComponent } from './pages/history/history.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
      { path: 'home', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'funds', component: FundsComponent },      
      { path: 'history', component: HistoryComponent },      
    ],
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
