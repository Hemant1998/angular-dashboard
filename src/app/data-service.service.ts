import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor() {

    localStorage.setItem('username',"admin@123");
    localStorage.setItem('password',"admin123");
  }
  isLoginSubject = new BehaviorSubject<boolean>(false);
  checkValidation(uname:string,pass:string){
    if(uname==localStorage.getItem('username') && pass==localStorage.getItem('password'))
      return true;
      else
       return false;
  }
  isLogged():Observable<boolean>{

    if(localStorage.getItem('loggedIn')=="OK"){
     this.isLoginSubject.next(true);
     return this.isLoginSubject.asObservable();
    }
    else{
    this.isLoginSubject.next(false);
    return this.isLoginSubject.asObservable();
    }
  }
}
