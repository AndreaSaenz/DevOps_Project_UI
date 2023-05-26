import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponentComponent } from './components/login-component/login-component.component';
import { RegisterComponentComponent } from './components/register-component/register-component.component';

import { authGuardGuard } from './guards/auth-guard.guard'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponentComponent },
  { path: 'register', component: RegisterComponentComponent }, 
  { path: 'main',  loadChildren: () => import('./components/main-content/main-content.module').then(x => x.MainContentModule), canActivate: [authGuardGuard] },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
