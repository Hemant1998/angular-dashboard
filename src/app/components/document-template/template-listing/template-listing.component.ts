import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-listing',
  templateUrl: './template-listing.component.html',
  styleUrls: ['./template-listing.component.css']
})
export class TemplateListingComponent implements OnInit {


  constructor(private service: DataServiceService, private router: Router ) {
    this.grid_url =  'http://localhost:8080/documentTemplates'
  }
  grid_url: string = " ";
  delete_url: string = "documentTemplate";
  Columns: any[] = [

     { 'columnName': 'documentTemplateName', 'displayName': 'Doc Template Name', "active": true, "hyperlink": true, "action": false }
    , { 'columnName': 'documentTypeName', 'displayName': 'Doc Type Name', "active": true, "hyperlink": false, "action": false }
    , { 'columnName': 'description', 'displayName': 'Description', "active": true, "hyperlink": false, "action": false }
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
    this.router.navigate(['/document-template-form'], { queryParams: event });
  }
}
