import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-document-form-dialog',
  templateUrl: './document-form-dialog.component.html',
  styleUrls: ['./document-form-dialog.component.css']
})
export class DocumentFormDialogComponent implements OnInit {

  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  role: string[]=['Admin','Author']
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'doc_type': [null, Validators.required],
      'discription': [null, Validators.required],

    });
  }

}
