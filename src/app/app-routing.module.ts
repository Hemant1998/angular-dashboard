import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthguardServiceService } from './services/authguard-service.service';
import { AdminComponent } from './components/admin/admin.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { DocumentFormComponent } from './components/document-type/document-form/document-form.component';
import { DocumentTypeListingComponent } from './components/document-type/document-type-listing/document-type-listing.component';
import { TemplateFormComponent } from './components/document-template/template-form/template-form.component';
import { TemplateListingComponent } from './components/document-template/template-listing/template-listing.component';
import { DocumentsComponent } from './components/documents/document-listing/documents.component';
import { DocumentsFormComponent } from './components/documents/documents-form/documents-form.component';
// import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
   { path: '', redirectTo: '/login', pathMatch: 'full' },
   { path: 'login', component: LogInComponent},
   { path: 'dashboard', component: NavbarComponent, canActivate: [AuthguardServiceService]},
    { path: 'admin', component: AdminComponent, canActivate: [AuthguardServiceService]},
    { path: 'register', component: RegisterComponent, canActivate: [AuthguardServiceService]}
   ,{path : 'userForm',component: UserFormComponent, canActivate: [AuthguardServiceService]}
   ,{path : 'document-form',component: DocumentFormComponent, canActivate: [AuthguardServiceService]}
   ,{path : 'document-type-listing',component: DocumentTypeListingComponent, canActivate: [AuthguardServiceService]}
   ,{path : 'document-template-form',component: TemplateFormComponent, canActivate: [AuthguardServiceService]}
   ,{path : 'document-template-listing',component: TemplateListingComponent, canActivate: [AuthguardServiceService]}
   ,{path : 'document-listing',component: DocumentsComponent, canActivate: [AuthguardServiceService]}
   ,{path : 'documents-form',component: DocumentsFormComponent, canActivate: [AuthguardServiceService]}

   //{ path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
