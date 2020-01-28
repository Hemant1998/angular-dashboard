import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DocumentFormComponent } from '../document-form/document-form.component';

@Component({
  selector: 'app-document-form-dialog',
  templateUrl: './document-form-dialog.component.html',
  styleUrls: ['./document-form-dialog.component.css']
})
export class DocumentFormDialogComponent implements OnInit {

  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  field_type: string[]=['Integer','String','Float','Boolean']
  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<DocumentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
     }

  ngOnInit() {


    this.createForm();
    if(this.data['content_with_id'] !=null)
    this.getData();
    // this.formGroup.controls['field_id'].setValue(this.data['content'].field_id);
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      field_id: [null, Validators.required],
      field_label: [null, Validators.required],
      field_sequence: [null, Validators.required],
      field_type: [null, Validators.required]

    });
  }
  dialogsubmit()
  {
    console.log("inside dialogsubmit");
  }
getData(){
  console.log(this.data);
  //console.log(this.data['content_with_id'].field_id);
  this.formGroup.controls['field_id'].setValue(this.data['content_with_id'].field_id);
  this.formGroup.controls['field_label'].setValue(this.data['content_with_id'].field_label);
  this.formGroup.controls['field_sequence'].setValue(this.data['content_with_id'].field_sequence);
  this.formGroup.controls['field_type'].setValue(this.data['content_with_id'].field_type);
}

}
export interface DialogData {
  animal: string;
  name: string;
}
