import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DocumentFormDialogComponent } from '../document-form-dialog/document-form-dialog.component';
@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.css']
})
export class DocumentFormComponent implements OnInit {


  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  role: string[]=['Admin','Author']
  displayedColumns: string[] = ['field_id', 'field_label', 'field_sequence', 'field_type'];
  dataSource = ELEMENT_DATA;
  constructor(private formBuilder: FormBuilder,public dialog: MatDialog) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'doc_type': [null, Validators.required],
      'discription': [null, Validators.required],

    });
  }

  opendialog(){
    const dialogRef = this.dialog.open(DocumentFormDialogComponent, {
      width: '800px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

export interface Doc_data {
  field_id: string;
  field_label: string;
  field_sequence: number;
  field_type: string;
}

const ELEMENT_DATA: Doc_data[] = [
  {field_id: '1', field_label: 'invoice', field_sequence: 1, field_type: 'boolean'}
];
