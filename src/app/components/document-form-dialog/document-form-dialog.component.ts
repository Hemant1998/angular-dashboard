import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DocumentFormComponent } from '../document-form/document-form.component';
import { DataServiceService } from 'src/app/services/data-service.service';
import { checkFieldId } from 'src/app/validators/custom-validator';

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
  dataElements:any;
  error_msg:string;
  status=false;
  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<DocumentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private dataService:DataServiceService) {
    }

  ngOnInit() {


    this.dataElements=this.data['content'];
   this.createForm();
    if(this.data['content_with_id']!=null)
    this.getData();
    // this.formGroup.controls['field_id'].setValue(this.data['content'].field_id);
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      field_id: [null, [Validators.required,this.validation]],
      field_label: [null, Validators.required],
      field_sequence: [null, Validators.required],
      field_type:[null, Validators.required],

    });
  }
  dialogsubmit()
  {
    console.log("inside dialogsubmit");
  }
getData(){
  console.log(this.data);
 this.formGroup.controls['field_id'].setValue(this.data['content_with_id'].field_id);
  this.formGroup.controls['field_label'].setValue(this.data['content_with_id'].field_label);
  this.formGroup.controls['field_sequence'].setValue(this.data['content_with_id'].field_sequence);
  this.formGroup.controls['field_type'].setValue(this.data['content_with_id'].field_type);
}


focusOutFunction(){
 if(this.dataElements.length>0){
      for (let i in this.dataElements) {
         console.log(this.dataElements[i].field_id == this.formGroup.get('field_id').value);
        if(this.dataElements[i].field_id == this.formGroup.get('field_id').value){
          console.log("inside if");
         // this.formGroup.controls['field_id'].setErrors({'requirements': true});
         this.status=true;
        //  this.formGroup.setErrors({"status": false});
         this.formGroup.get('field_id').setErrors({'status':true});
         break;
        }
    }
      }
}
focusinFunction(){
  this.status=false;
}

validation(control: AbstractControl) {
  return  false?{ 'status' : { value: control.value } }:null;

}
getErrorId() {
  return this.formGroup.get('field_id').hasError('required') ? 'Field is required' :
    this.formGroup.get('field_id').hasError('status') ? 'Not a valid id'  : '';
}
}
export interface DialogData {
  animal: string;
  name: string;
}
