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
    this.grid_url = "http://192.168.1.128:8086/getAllModelWithPage/1";
  }
  grid_url: string = " ";

  Columns: any[] = [
    {
      columnName: "userName",
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
    }
    // , { 'columnName': 'id', 'displayName': 'Action', "active": true, "hyperlink": false, "action": true }
  ];
  ngOnInit() {}
  gotToDesc(event) {
    console.log(event);
    let queryParams = event;
    //this.router.navigateByUrl('/view-asset', { state: event });
    this.router.navigate(["/view-asset"], { queryParams: event });
  }
}
