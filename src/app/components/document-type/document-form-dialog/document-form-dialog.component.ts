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
  seq_status=false;
  receivedChildMessage: string;

  getMessage(message: string) {
    this.receivedChildMessage = message;
  }
  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<DocumentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private dataService:DataServiceService) {
      this.dataElements=this.data['content'];
    }

  ngOnInit() {



   this.createForm();
    if(this.data['content_with_id']!=null)
    this.getData();
    // this.formGroup.controls['field_id'].setValue(this.data['content'].field_id);
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      field_id: [null, [Validators.required,this.validation]],
      field_label: [null, Validators.required],
      field_sequence: [null, [Validators.required,this.validationSeq]],
      field_type:' ',

    });
  }
  dialogsubmit()
  {
    console.log("inside dialogsubmit");
    this.formGroup.controls['field_type'].setValue(this.receivedChildMessage);
    console.log(this.receivedChildMessage);

  }
getData(){
 this.formGroup.controls['field_id'].setValue(this.data['content_with_id'].field_id);
  this.formGroup.controls['field_label'].setValue(this.data['content_with_id'].field_label);
  this.formGroup.controls['field_sequence'].setValue(this.data['content_with_id'].field_sequence);
  this.formGroup.controls['field_type'].setValue(this.data['content_with_id'].field_type);
}


focusOutFunction(data:string){

 if(this.dataElements.length>0 && this.data['content_with_id']==null){

      for (let i in this.dataElements) {
        if(data=='field_sequence'){
       if(this.dataElements[i].field_sequence == this.formGroup.get('field_sequence').value){
          this.seq_status=true;
          this.formGroup.get(data).setErrors({'seq_status':true});
         }
        }
        if(data=='field_id'){
       if(this.dataElements[i].field_id == this.formGroup.get('field_id').value){
         this.status=true;
         this.formGroup.get(data).setErrors({'status':true});
        }
      }
    }
      }
      if(this.dataElements.length>0 && this.data['content_with_id']!=null){
        let a:number=0;
        let b:number=0;
        console.log("inside if")
        for (let i in this.dataElements) {
          if(data=='field_sequence'){
            if(this.dataElements[i].field_sequence == this.formGroup.get('field_sequence').value
            && this.data['content_with_id'].field_sequence !=this.formGroup.get('field_sequence').value){
             a++;

              }
             }
             if(data=='field_id'){

              if(this.dataElements[i].field_id == this.formGroup.get('field_id').value
                && this.data['content_with_id'].field_id !=this.formGroup.get('field_id').value){
                b++;

               }
             }
        }
       if(a >= 1){
          this.seq_status=true;
         this.formGroup.get(data).setErrors({'seq_status':true});
         }
         if(b >= 1){
         this.status=true;
        this.formGroup.get(data).setErrors({'status':true});
        }
        }
}
focusinFunction(data:string){
  if(data=='field_id'){
     this.status=false;
  }
  if(data=='field_sequence'){
    this.seq_status=false;
  }
}

validation(control: AbstractControl) {
  return  false?{ 'status' : { value: control.value } }:null;

}
validationSeq(control: AbstractControl) {
  return  false?{ 'seq_status' : { value: control.value } }:null;

}
getErrorId() {
  return this.formGroup.get('field_id').hasError('required') ? 'Field is required' :
    this.formGroup.get('field_id').hasError('status') ? 'Duplicate Field Id not allowed'  : '';
}
getErrorSeq() {
  return this.formGroup.get('field_sequence').hasError('required') ? 'Field is required' :
    this.formGroup.get('field_sequence').hasError('seq_status') ? 'Duplicate Field Sequence not allowed'  : '';
}
}
export interface DialogData {
  d1: string;
  d2: string;
}
