import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html'
})
export class LoginContainerComponent implements  AfterViewInit {
  public isAuthorized = false;
  constructor(private elementRef: ElementRef, private userService: UserService, private router: Router) {
    this.isAuthorized = this.userService.isAuthorized();
    console.log(this.isAuthorized);
  }

  ngAfterViewInit() {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '/assets/eyes.js';
    this.elementRef.nativeElement.appendChild(s);
  }

  logIn(p_login: string) {
    this.userService.authUser(p_login);
    this.router.navigate(['/list']);
  }
  logOut() {
    this.userService.logOut();
    this.isAuthorized = false;
  }

}
