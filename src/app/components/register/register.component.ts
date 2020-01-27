import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  Roles: any = ['Admin', 'Author', 'Reader'];
  data: string;
  constructor(private service:DataServiceService) { }

  ngOnInit() {
    this.service.getData().subscribe(m=>{
      this.data=m;
    });
  }

}
