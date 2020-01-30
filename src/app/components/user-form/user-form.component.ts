import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

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

 options = [
   {
     display: 'admin',
     value: '1'
   }, {
     display: 'author',
     value: '2'
   }
 ];
 profileForm = new FormGroup({
   selected: new FormControl(['1', '2', '3'])
 });

 constructor(private formBuilder: FormBuilder) { }

 ngOnInit() {
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
     'user_role':[null, Validators.required]
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



}
