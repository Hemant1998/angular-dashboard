import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-type-listing',
  templateUrl: './document-type-listing.component.html',
  styleUrls: ['./document-type-listing.component.css']
})
export class DocumentTypeListingComponent implements OnInit {

  constructor(private service: DataServiceService, private router: Router ) {
    this.grid_url =  'http://192.168.1.128:8086/getAllModelWithPage/1'
  }
  grid_url: string = " ";

  Columns: any[] = [

     { 'columnName': 'userName', 'displayName': 'User Name', "active": true, "hyperlink": true, "action": false }
    , { 'columnName': 'firstName', 'displayName': 'First Name', "active": true, "hyperlink": false, "action": false }
    // , { 'columnName': 'id', 'displayName': 'Action', "active": true, "hyperlink": false, "action": true }
  ];
  ngOnInit() {
  }
  gotToDesc(event){
    console.log(event);
    let queryParams= event;
    //this.router.navigateByUrl('/view-asset', { state: event });
    this.router.navigate(['/view-asset'], { queryParams: event });
  }
}
