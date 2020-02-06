import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataServiceService } from "src/app/services/data-service.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  constructor(private service: DataServiceService, private router: Router) {
    this.grid_url = "http://localhost:8080/users";
  }
  grid_url: string = " ";
  delete_url:string="user";
  Columns: any[] = [
    {
      columnName: "username",
      displayName: "User Name",
      active: true,
      hyperlink: true,
      action: false
    },
    {
      columnName: "firstName",
      displayName: "First Name",
      active: true,
      hyperlink: false,
      action: false
    },
    {
      columnName: "lastName",
      displayName: "Last Name",
      active: true,
      hyperlink: false,
      action: false
    },
    {
      columnName: "id",
      displayName: "Action",
      active: true,
      hyperlink: false,
      action: true
    }
    // , { 'columnName': 'id', 'displayName': 'Action', "active": true, "hyperlink": false, "action": true }
  ];
  ngOnInit() { }
  gotToDesc(event) {
    console.log(event);
    let queryParams = event;
    if(event.columnName=='edit')
        this.router.navigate(["/userForm"], { queryParams: event });
    // if(event.columnName=='delete'){
    //   this.service.deleteUser(event.columnValue).subscribe(res=>{
    //            console.log('sucess');
    //        });
    //        this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    // }

  }
}
