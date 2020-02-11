import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private subject = new Subject<any>();
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
  sendData(data: any) {
    console.log(data);
    this.subject.next({ text: data });
  }
  getDatas(): Observable<any> {
    return this.subject.asObservable();
  }

  saveUser(obj:Object): Observable<any> {
    return this.http.post<any>(this.api_url+"/user", obj);
  }
  getUserById(id:number):Observable<any> {
    return this.http.get(this.api_url + '/user/'+id);
  }
  updateUser(obj:Object): Observable<any> {
    return this.http.put<any>(this.api_url+"/user", obj);
  }
  deleteUser(id:number,name:string):Observable<any> {
    return this.http.delete(this.api_url + '/'+name+'/'+id);
  }
  getFieldTypes():Observable<any>{
    console.log("inside service");
    return this.http.get(this.api_url +"/fieldTypes");
  }
  saveDocumentType(obj:Object): Observable<any> {
    return this.http.post<any>(this.api_url+"/documentType", obj);
  }
  getDocTypeById(id:number):Observable<any> {
    return this.http.get(this.api_url + '/documentType/'+id);
  }
  updateDocTypeById(obj:Object): Observable<any> {
    return this.http.put<any>(this.api_url+"/documentType", obj);
  }
  getDocTemplateById(id:number):Observable<any> {
    return this.http.get(this.api_url + '/documentTemplate/'+id);
  }
  getDocumentTypes():Observable<any>{
    return this.http.get(this.api_url + '/documentTypes/');
  }
  saveDocumentTemplate(obj:Object): Observable<any> {
    return this.http.post<any>(this.api_url+"/documentTemplate", obj);
  }
  updateDocTemplById(obj:Object): Observable<any> {
    return this.http.put<any>(this.api_url+"/documentTemplate", obj);
  }
}
