import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthguardServiceService } from './services/authguard-service.service';
import { AdminComponent } from './components/admin/admin.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { DocumentFormComponent } from './components/document-form/document-form.component';
// import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
   { path: '', redirectTo: '/login', pathMatch: 'full' },
   { path: 'login', component: LogInComponent},
   { path: 'dashboard', component: NavbarComponent, canActivate: [AuthguardServiceService]},
    { path: 'admin', component: AdminComponent, canActivate: [AuthguardServiceService]},
    { path: 'register', component: RegisterComponent, canActivate: [AuthguardServiceService]}
   ,{path : 'userForm',component: UserFormComponent, canActivate: [AuthguardServiceService]}
   ,{path : 'document-form',component: DocumentFormComponent, canActivate: [AuthguardServiceService]}
   //{ path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
