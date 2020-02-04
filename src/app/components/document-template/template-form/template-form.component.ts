import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { DataServiceService } from 'src/app/services/data-service.service';
import { TemplateFormDialogComponent } from '../template-form-dialog/template-form-dialog.component';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {


  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  doc_type_list: string[]=['Invoice','Purchase Order']
  displayedColumns: string[] = ['field_id', 'field_label', 'field_sequence', 'field_type','action'];
  displayedColumns_dtype: string[] = ['field_id', 'field_label', 'field_sequence', 'field_type'];
  ELEMENT_DATA: Doc_data[] = [

  ];
  dataSource = new BehaviorSubject([]);
  dataSource_dtype = new BehaviorSubject([]);
  flag:Boolean;
  id:number;
  //dataSource = this.ELEMENT_DATA;

  filteredOptions: Observable<string[]>;
  constructor(private formBuilder: FormBuilder,public dialog: MatDialog, private dataService:DataServiceService) { }

  ngOnInit() {

    this.createForm();
    this.filteredOptions = this.formGroup.get('doc_type_dropdown').valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.doc_type_list.filter(option => option.toLowerCase().includes(filterValue));
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'doc_templ': [null, Validators.required],
      'discription': [null, Validators.required],
      'doc_type_dropdown':[null, Validators.required],

    });
  }

  opendialog(element){
   // this.sendData();
   if(this.ELEMENT_DATA.length==0)
        this.id=0;
   console.log("beforopendialog");
   console.log(this.ELEMENT_DATA);
    const dialogRef = this.dialog.open(TemplateFormDialogComponent, {
      width: '800px',
      height: '400px',
      data:{content:this.ELEMENT_DATA,
        content_with_id:element,
        id:this.id
      }
    });
    this.flag=false;
    dialogRef.afterClosed().subscribe(result => {
    for (let i in this.ELEMENT_DATA) {
              if(this.ELEMENT_DATA[i].field_id == result.value.field_id)
              this.flag=true;
      }

      if(!this.flag && result)
      this.ELEMENT_DATA.push(result.value);
      else
      for (let i in this.ELEMENT_DATA) {
        if (this.ELEMENT_DATA[i].field_id == result.value.field_id) {
          this.ELEMENT_DATA[i].field_label = result.value.field_label;
          this.ELEMENT_DATA[i].field_sequence = result.value.field_sequence;
          this.ELEMENT_DATA[i].field_type = result.value.field_type;
        }
      }

      this.dataSource.next(this.ELEMENT_DATA);
    });
  }
  deleteElement(fieldId:any){
    this.ELEMENT_DATA.forEach(ele=>{
      if ( ele.field_id == fieldId)
      this.ELEMENT_DATA.splice(this.ELEMENT_DATA.indexOf(ele), 1);
    })

      this.dataSource.next(this.ELEMENT_DATA);


  }

}

export interface Doc_data {
  id:number;
  field_id: string;
  field_label: string;
  field_sequence: number;
  field_type: string;
  action:any;
}
