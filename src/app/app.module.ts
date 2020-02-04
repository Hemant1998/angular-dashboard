import { BrowserModule } from '@angular/platform-browser';

/ Routing /
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

/ Angular Material /
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
/ FormsModule /
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/ Angular Flex Layout /
import { FlexLayoutModule } from "@angular/flex-layout";

/ Components /
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminComponent } from './components/admin/admin.component';
import { TableComponent } from './components/table/table.component';
import {MatMenuModule} from '@angular/material/menu';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import {MatTreeModule} from '@angular/material/tree';
import { UserFormComponent } from './components/user-form/user-form.component';
import { DocumentFormComponent } from './components/document-form/document-form.component';
import { DocumentFormDialogComponent } from './components/document-form-dialog/document-form-dialog.component';
import { DocumentTypeListingComponent } from './components/document-type/document-type-listing/document-type-listing.component';
import { DocumentTypeAddformComponent } from './components/document-type/document-type-addform/document-type-addform.component';
import { TemplateListingComponent } from './components/document-template/template-listing/template-listing.component';
import { TemplateFormComponent } from './components/document-template/template-form/template-form.component';
import { TemplateFormDialogComponent } from './components/document-template/template-form-dialog/template-form-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    RegisterComponent,
    LogInComponent,
    NavbarComponent,
    AdminComponent,
    TableComponent,
    UserFormComponent,
    DocumentFormComponent,
    DocumentFormDialogComponent,
    DocumentTypeListingComponent,
    DocumentTypeAddformComponent,
    TemplateListingComponent,
    TemplateFormComponent,
    TemplateFormDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatMenuModule,
    HttpClientModule,
    MatSortModule,
    MatTreeModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    MatDialogModule,
    MatAutocompleteModule,
    SelectAutocompleteModule
  ],
  entryComponents: [DocumentFormDialogComponent,TemplateFormDialogComponent],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
