import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  constructor(private http: HttpClient) {

    localStorage.setItem('username',"admin@123");
    localStorage.setItem('password',"admin123");
  }
  api_url:string="http://localhost:8080";
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
 public getData():Observable<any> {
    return this.http.get(this.api_url + '/users', {responseType: 'text'});
  }
}
