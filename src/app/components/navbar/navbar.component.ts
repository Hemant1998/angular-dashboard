import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { DataServiceService } from 'src/app/data-service.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  profileName: Observable<string>;
  url: Observable<any>;
  isLoggedIn:Observable<boolean>;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private _router: Router, private sanitizer: DomSanitizer,private routes:Router,
    private service:DataServiceService) { }

  ngOnInit(): void {
    this.isLoggedIn=this.service.isLogged();
    if(this.isLoggedIn)
    this._router.navigate(['/admin']);
  }

  @ViewChild('sidenav',null) sidenav:any;
   toggleSidenav()
  {
    this.sidenav.toggle();
  }

  logout() {
    localStorage.removeItem('loggedIn');
    this.isLoggedIn=this.service.isLogged();
   this._router.navigate(['/login']);
}


  transform(base64Image) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }

}
