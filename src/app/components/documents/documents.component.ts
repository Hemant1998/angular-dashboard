import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataServiceService } from "src/app/services/data-service.service";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  constructor(private service: DataServiceService, private router: Router) {
    this.grid_url = "http://localhost:8080/user";
  }
  grid_url: string = " ";
  delete_url: string = "user";
  Columns: any[] = [
    {
      columnName: "documentName",
      displayName: "Document Name",
      active: true,
      hyperlink: true,
      action: false
    },
    {
      columnName: "documentTypeName",
      displayName: "Doc Type Name",
      active: true,
      hyperlink: false,
      action: false
    },
    {
      columnName: "documentTemplateName",
      displayName: "Doc Template Name",
      active: true,
      hyperlink: false,
      action: false
    },
    {
      columnName: "uploadedBy",
      displayName: "Uploaded By",
      active: true,
      hyperlink: false,
      action: false
    },
    {
      columnName: "uploadedOn",
      displayName: "Uploaded On",
      active: true,
      hyperlink: false,
      action: false
    },
    {
      columnName: "status",
      displayName: "Status",
      active: true,
      hyperlink: false,
      action: false
    },
    // {
    //   columnName: "id",
    //   displayName: "Action",
    //   active: true,
    //   hyperlink: false,
    //   action: false
    // }
    // , { 'columnName': 'id', 'displayName': 'Action', "active": true, "hyperlink": false, "action": true }
  ];
  ngOnInit() { }
  gotToDesc(event) {
    console.log(event);
    let queryParams = event;
    if (event.columnName == 'edit' || event.columnName == 'view')
      this.router.navigate(["/userForm"], { queryParams: event });

    // if(event.columnName=='delete'){
    //   this.service.deleteUser(event.columnValue).subscribe(res=>{
    //            console.log('sucess');
    //        });
    //        this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    // }

  }
}
