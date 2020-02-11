import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { DataServiceService } from 'src/app/services/data-service.service';
import { TemplateFormDialogComponent } from '../template-form-dialog/template-form-dialog.component';
import {map, startWith} from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
  displayedColumns_dtype: string[] = ['fieldId', 'fieldLabel', 'field_sequence', 'fieldType'];
  ELEMENT_DATA: Doc_data[] = [
  ];
  dataSource = new BehaviorSubject([]);
  dataSource_dtype = new BehaviorSubject([]);
  flag:Boolean;
  id:number;
  documentTypeList:any[]=[];
  documentTypeListValue:string[]=[];
  editFieldType:string;
  fieldTypeObj:any[]=[];
  table1Data:any[]=[];
  doctypeId;
  edit;
  editId;
  view;
  //dataSource = this.ELEMENT_DATA;

  filteredOptions: Observable<string[]>;
  receivedChildMessage: string;
  constructor(private formBuilder: FormBuilder,public dialog: MatDialog,
     private dataService:DataServiceService,
     private route:ActivatedRoute,
     private router:Router) {
      this.route.queryParams.subscribe(
        (params: ParamMap) => {
          //  this.dataService.getDocTemplateById(params['columnValue']).subscribe(res=>{
          //   this.editFieldType=res.documentTypeName;
          // })
          this.dataService.getDocTemplateById(params['columnValue']).toPromise().then(data => {
            this.editFieldType=data.documentTypeName;
            console.log("data");
          });
        })
      this.dataService.getFieldTypes().subscribe(res=>{
        this.fieldTypeObj=res;
      })
     }

  ngOnInit() {
    this.createForm();
    this.getQueryParam();
  }


  createForm() {
    this.formGroup = this.formBuilder.group({
      'doc_templ': [null, Validators.required],
      'discription': [null, Validators.required],
      'doc_type_dropdown':'',
      'documentTemplateCode':[null, Validators.required],
    });
    this.dataService.getDocumentTypes().subscribe(res=>{
        this.documentTypeList=res;
       for(let i=0;i<this.documentTypeList.length;i++){
          this.documentTypeListValue.push(this.documentTypeList[i].documentTypeName);
       }
    })


  }
  getMessage(message: string) {
    this.receivedChildMessage = message;
    this.doctypeId= this.findItem(this.documentTypeList,this.receivedChildMessage)[0].id;
    this.getdoctypeTable(this.doctypeId);
    console.log("inside getmessage");
    console.log(this.dataSource_dtype);

  }
  getdoctypeTable(doctid){
    this.dataService.getDocTypeById(doctid).subscribe(res=>{
      console.log("filedty");
      console.log(res.fields);
        this.table1Data=[];
      for(let i=0;i<res.fields.length;i++){
      let obj:any={
        fieldId:res.fields[i].fieldId,
        fieldLabel:res.fields[i].fieldLabel,
        field_sequence:"",
        fieldType:this.getfieldType(res.fields[i].fieldType)
      }
      this.table1Data.push(obj);
    }
    console.log(this.table1Data);
      this.dataSource_dtype.next(this.table1Data);
    })
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
  onSubmit(){
    let objArr: field[] = [];
    let fieldType;

    this.ELEMENT_DATA.forEach((value, i) => {

      let objdata:field={
        fieldLabel:value.field_label,
        fieldType:this.getfieldLookupType(value.field_type),
        fieldId:value.field_id,
        id:value.id
     }
      objArr.push(objdata);
    });
    //let doctypeId=this.documentTypeList[this.documentTypeList.indexOf(this.receivedChildMessage)].id


    let obj: any = {
      documentTemplateName:this.formGroup.controls['doc_templ'].value,
      documentTypeId:this.doctypeId,
      description:this.formGroup.controls['discription'].value,
      documentTemplateCode:this.formGroup.controls['documentTemplateCode'].value,
      templateFields:objArr
    };
      console.log(obj);
    if(this.edit){
      obj.id=this.editId;
      this.dataService.updateDocTemplById(obj).subscribe(res=>{
          alert("Document Type Updated!");
      })
    }
    else{
    this.dataService.saveDocumentTemplate(obj).subscribe(res=>{
        alert("Document Template Saved!");
    })
   }
  }
  getQueryParam(){
    let objArr:Doc_data[]=[];
    this.route.queryParams.subscribe(
      (params: ParamMap) => {
        if(params['columnName']=='edit') {
          this.edit=true;
          this.editId=params['columnValue'];
        }
        if(params['columnName']=='view'){
          this.view=true;
          this.formGroup.controls['doc_templ'].disable();
          this.formGroup.controls['discription'].disable();
          this.formGroup.controls['documentTemplateCode'].disable();
          this.formGroup.controls['doc_type_dropdown'].disable();
        }
       this.dataService.getDocTemplateById(params['columnValue']).subscribe(res=>{
        this.formGroup.controls['doc_templ'].setValue(res.documentTemplateName);
        this.formGroup.controls['discription'].setValue(res.description);
        this.formGroup.controls['doc_type_dropdown'].setValue(res.documentTypeName);
        this.formGroup.controls['documentTemplateCode'].setValue(res.documentTemplateCode);
        this.editFieldType=res.documentTypeName;
        this.getdoctypeTable(res.documentTypeId);
        res.templateFields.forEach(data=>{

          let obj:any={
            field_id:data.fieldId,
            field_label:data.fieldLabel,
            field_sequence:"",
            id:data.id,
            field_type:this.getfieldType(data.fieldType)
          }
          this.ELEMENT_DATA.push(obj);
        });
        this.dataSource.next(this.ELEMENT_DATA);
       })
      }

    )
  }
  getfieldType(data){
  for(let i=0;i<this.fieldTypeObj.length;i++){
    if(data==this.fieldTypeObj[i].lookupKey)
    return this.fieldTypeObj[i].displayName;
  }

  }
  getfieldLookupType(data){
  for(let i=0;i<this.fieldTypeObj.length;i++){
    if(data==this.fieldTypeObj[i].displayName)
    return this.fieldTypeObj[i].lookupKey;
  }
}
  findItem(arr,val)
  {
      return arr.filter(m=>m.documentTypeName===val)
  }
  goBack(){
    this.router.navigate(["/document-template-listing"]);
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
export class field {
  id?: number;
  fieldLabel: string;
  fieldType: string;
  fieldId: string;
}
