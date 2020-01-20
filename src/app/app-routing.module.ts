import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthGuard } from './authguar.service';
import { AdminComponent } from './components/admin/admin.component';
// import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
   { path: '', component: LogInComponent },
   { path: 'login', component: LogInComponent},
   { path: 'dashboard', component: NavbarComponent, canActivate: [AuthGuard]},
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]}
   //{ path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
