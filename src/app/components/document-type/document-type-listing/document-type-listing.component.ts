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
    this.grid_url =  'http://localhost:8080/documentTypes'
  }
  grid_url: string = " ";
  delete_url: string = "documentType";
  Columns: any[] = [

     { 'columnName': 'documentTypeName', 'Doc Type Name': 'User Name', "active": true, "hyperlink": true, "action": false }
    , { 'columnName': 'description', 'displayName': 'Discription', "active": true, "hyperlink": false, "action": false }
    ,{
      'columnName': "id",
      'displayName': "Action",
      'active': true,
      'hyperlink': false,
      'action': true
    }
    // , { 'columnName': 'id', 'displayName': 'Action', "active": true, "hyperlink": false, "action": true }
  ];
  ngOnInit() {
  }
  gotToDesc(event){
    console.log(event);
    let queryParams= event;
    //this.router.navigateByUrl('/view-asset', { state: event });
    this.router.navigate(['/document-form'], { queryParams: event });
  }
}
