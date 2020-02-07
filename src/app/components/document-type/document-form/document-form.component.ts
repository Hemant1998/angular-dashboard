import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { DocumentFormDialogComponent } from "../document-form-dialog/document-form-dialog.component";
import { BehaviorSubject } from "rxjs";
import { DataServiceService } from "src/app/services/data-service.service";
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
@Component({
  selector: "app-document-form",
  templateUrl: "./document-form.component.html",
  styleUrls: ["./document-form.component.css"]
})
export class DocumentFormComponent implements OnInit {
  formGroup: FormGroup;
  titleAlert: string = "This field is required";
  post: any = "";
  role: string[] = ["Admin", "Author"];
  displayedColumns: string[] = [
    "field_id",
    "field_label",
    "field_sequence",
    "field_type",
    "action"
  ];
  ELEMENT_DATA: Doc_data[] = [];
  dataSource = new BehaviorSubject([]);
  flag: Boolean;
  id: number;
  fieldTypeObj:any;
  edit:boolean;
  editId:number;
  view:boolean;
  //dataSource = this.ELEMENT_DATA;
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private dataService: DataServiceService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {
    this.createForm();
    this.getQueryParam();

    this.dataService.getFieldTypes().subscribe(res=>{

      this.fieldTypeObj=res;
    })
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      doc_type: [null, Validators.required],
      discription: [null, Validators.required]
    });
  }

  opendialog(element) {
    // this.sendData();
    if (this.ELEMENT_DATA.length == 0) this.id = 0;

    const dialogRef = this.dialog.open(DocumentFormDialogComponent, {
      width: "800px",
      height: "400px",
      data: {
        content: this.ELEMENT_DATA,
        content_with_id: element,
        id: this.id
      }
    });
    this.flag = false;
    dialogRef.afterClosed().subscribe(result => {
      for (let i in this.ELEMENT_DATA) {
        if (this.ELEMENT_DATA[i].field_id == result.value.field_id)
          this.flag = true;
      }

      if (!this.flag && result) this.ELEMENT_DATA.push(result.value);
      else
        for (let i in this.ELEMENT_DATA) {
          if (this.ELEMENT_DATA[i].field_id == result.value.field_id) {
            this.ELEMENT_DATA[i].field_label = result.value.field_label;
            this.ELEMENT_DATA[i].field_sequence = result.value.field_sequence;
            this.ELEMENT_DATA[i].field_type = result.value.field_type;
          }
        }

      this.dataSource.next(this.ELEMENT_DATA);
      console.log(this.dataSource);
    });
  }
  deleteElement(fieldId: any) {
    this.ELEMENT_DATA.forEach(ele => {
      if (ele.field_id == fieldId)
        this.ELEMENT_DATA.splice(this.ELEMENT_DATA.indexOf(ele), 1);
    });

    this.dataSource.next(this.ELEMENT_DATA);
  }

  onSubmit() {

    let objArr: field[] = [];
    let fieldType;

    this.ELEMENT_DATA.forEach((value, i) => {
      this.fieldTypeObj.forEach(element => {
        if(element.displayName==value.field_type) fieldType=element.lookupKey;
      });
      let objdata:field={
        fieldLabel:value.field_label,
        fieldType:value.field_type,
        fieldId:value.field_id
     }
      objArr.push(objdata);
    });
    let obj: any = {
      documentTypeName:this.formGroup.controls['doc_type'].value,
      description:this.formGroup.controls['discription'].value,
      fields:objArr
    };
    if(this.edit){
      obj.id=this.editId;
      this.dataService.updateDocTypeById(obj).subscribe(res=>{
          alert("Document Type Updated!");
      })
    }
    else{
    this.dataService.saveDocumentType(obj).subscribe(res=>{
        console.log(res);
        alert("Document Type Saved!");
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
          this.formGroup.controls['doc_type'].disable();
          this.formGroup.controls['discription'].disable();
        }
            this.dataService.getDocTypeById(params['columnValue']).subscribe(res=>{
                console.log(res);
                this.formGroup.controls['doc_type'].setValue(res.documentTypeName);
                this.formGroup.controls['discription'].setValue(res.description);
                res.fields.forEach(data=>{
                  let obj:any={
                    field_id:data.fieldId,
                    field_label:data.fieldLabel,
                    field_sequence:"",
                    field_type:data.fieldType
                  }
                  this.ELEMENT_DATA.push(obj);
                });
                this.dataSource.next(this.ELEMENT_DATA);
            })
      }

    )
  }
  goback(){
    this.router.navigate(["/document-type-listing"]);
  }
}

export interface Doc_data {
  id?: number;
  field_id: string;
  field_label: string;
  field_sequence: number;
  field_type: string;
  action?: any;
}
export class field {
  id?: string;
  fieldLabel: string;
  fieldType: string;
  fieldId: string;
}
