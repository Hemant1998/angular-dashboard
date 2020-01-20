import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  uname:string;
  pass:string;
  isLoggedIn:boolean;
  constructor(private service:DataServiceService,private routes:Router) { }

  ngOnInit() {
  }

  login(){
    this.isLoggedIn=this.service.checkValidation(this.uname,this.pass);
    if(this.isLoggedIn){
      localStorage.setItem('loggedIn',"OK");
      console.log("inside login");
        this.routes.navigateByUrl('/dashboard');
    }
  }
}
