import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardServiceService implements CanActivate{

  public sideNavState$: Subject<boolean> = new Subject();
  constructor(private routes : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(localStorage.getItem('loggedIn')== 'OK'){
        return true;
          }
          else
          {
            this.routes.navigate(['/login']);
            return false;
          }

  }
}
