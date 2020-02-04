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
  //dataSource = this.ELEMENT_DATA;
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private dataService: DataServiceService
  ) {}

  ngOnInit() {
    this.createForm();
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
      console.log("field_type");
      console.log(result.value.field_type);

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
    });
  }
  deleteElement(fieldId: any) {
    this.ELEMENT_DATA.forEach(ele => {
      if (ele.field_id == fieldId)
        this.ELEMENT_DATA.splice(this.ELEMENT_DATA.indexOf(ele), 1);
    });

    this.dataSource.next(this.ELEMENT_DATA);
  }
}

export interface Doc_data {
  id: number;
  field_id: string;
  field_label: string;
  field_sequence: number;
  field_type: string;
  action: any;
}
