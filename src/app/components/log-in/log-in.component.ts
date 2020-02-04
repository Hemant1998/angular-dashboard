import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
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
 hide = true;
 type:string="password";
 constructor(private service:DataServiceService,private routes:Router) { }

 ngOnInit() {
 }

 login(){
   console.log(this.uname)
   this.isLoggedIn=this.service.checkValidation(this.uname,this.pass);
   if(this.isLoggedIn){
     localStorage.setItem('loggedIn',"OK");
     console.log("inside login");
       this.routes.navigateByUrl('/dashboard');

   }
 }

 myFunction() {

   if (this.type=== "password") {
     this.type = "text";
   } else {
     this.type = "password";
   }
 }
}



