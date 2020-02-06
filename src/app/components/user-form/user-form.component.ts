import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
 selector: 'app-user-form',
 templateUrl: './user-form.component.html',
 styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

 formGroup: FormGroup;
 titleAlert: string = 'This field is required';
 post: any = '';
 public searchrole: FormControl = new FormControl();
 role: string[]=['Admin','Author'];
 filteredOptions: Observable<string[]>;
 receivedChildMessage: string;
 userobj:any={};
 action:boolean;
 userId:number;
 constructor(private formBuilder: FormBuilder,
  private service:DataServiceService,
  private route:ActivatedRoute) { }

 ngOnInit() {
   this.getQueryParam();
   this.createForm();
   this.filteredOptions = this.formGroup.get('user_role').valueChanges
   .pipe(
     startWith(''),
     map(value => this._filter(value))
   );
   //this.setChangeValidate()
 }
 private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.role.filter(option => option.toLowerCase().includes(filterValue));
}
 createForm() {
   let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   let mobnum = "^((\\+91-?)|0)?[0-9]{10}$";
   this.formGroup = this.formBuilder.group({
     'user_name': [null, Validators.required],
     // 'user_name': [null, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail],
     'password': [null, Validators.required],
     're_password':  [null, Validators.required],
     'first_name': [null, Validators.required],
     'last_name': [null, Validators.required],
     'email':[null, [Validators.required, Validators.pattern(emailregex)]],
     'contact':[null,[Validators.required, Validators.pattern(mobnum)]],
     'user_role':' '
   });
 }

 // setChangeValidate() {
 //   this.formGroup.get('validate').valueChanges.subscribe(
 //     (validate) => {
 //       if (validate == '1') {
 //         this.formGroup.get('name').setValidators([Validators.required, Validators.minLength(3)]);
 //         this.titleAlert = "You need to specify at least 3 characters";
 //       } else {
 //         this.formGroup.get('name').setValidators(Validators.required);
 //       }
 //       this.formGroup.get('name').updateValueAndValidity();
 //     }
 //   )
 // }

 // get name() {
 //   return this.formGroup.get('name') as FormControl
 // }

//   checkPassword(control) {
//     let enteredPassword = this.formGroup.get('password').value;
//     let passwordCheck = this.formGroup.get('re_password').value;;
//     return enteredPassword == passwordCheck ? { 'requirements': true } : null;
// }



 // checkInUseEmail(control) {
 //   let db = ['tony@gmail.com'];
 //   return new Observable(observer => {
 //     setTimeout(() => {
 //       let result = (db.indexOf(control.value) !== -1) ? { 'alreadyInUse': true } : null;
 //       observer.next(result);
 //       observer.complete();
 //     }, 4000)
 //   })
 // }

 getErrorEmail() {
   return this.formGroup.get('email').hasError('required') ? 'Field is required' :
     this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
       this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
 }

 getErrorPassword() {
   return this.formGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
     this.formGroup.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
 }

 getErrorContact() {
   return this.formGroup.get('contact').hasError('required') ? 'Field is required' :
       this.formGroup.get('contact').hasError('pattern') ? 'Contact should be numbers' : '';
 }

 // getErrorRePass() {
 //   return this.formGroup.get('re_password').hasError('required') ? 'Field is required' :
 //       this.formGroup.get('re_password').hasError('requirements') ? 'password is mismatch' : '';
 // }

  onSubmit(){
    this.formGroup.controls['user_role'].setValue(this.receivedChildMessage);
   this.userobj.username=this.formGroup.get('user_name').value;
   this.userobj.password=this.formGroup.get('password').value;
   this.userobj.firstName=this.formGroup.get('first_name').value;
   this.userobj.lastName=this.formGroup.get('last_name').value;
   this.userobj.roleName=this.formGroup.get('user_role').value;
   if(this.action){
      this.userobj.id=this.userId;
      this.service.updateUser(this.userobj).subscribe(m=>{
        console.log("success");
      });
   }
      else{
       this.service.saveUser(this.userobj).subscribe(m=>{
     console.log("success");
   });
  }
  }
  getMessage(message: string) {
    console.log(message);
    this.receivedChildMessage = message;
  }
  getdata(){
    this.service.getData().subscribe(m=>{
      console.log("list");
    })
  }
  getQueryParam(){
    this.route.queryParams.subscribe(
      (params: ParamMap) => {
        if(params['columnName']=='edit')
          this.action=true;
          this.userId=parseInt(params['columnValue']);
          this.service.getUserById(params['columnValue']).subscribe(m=>{
            this.formGroup.controls['user_name'].setValue(m.username);
            this.formGroup.controls['first_name'].setValue(m.firstName);
            this.formGroup.controls['last_name'].setValue(m.lastName);
        });
      }
    )
  }
}
