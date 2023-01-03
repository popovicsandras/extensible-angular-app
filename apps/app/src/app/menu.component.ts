import { Component, Inject } from '@angular/core';
import { AuthenticationService, AuthenticationServiceToken } from '@extensible-angular-app/sdk';
import { Observable } from 'rxjs';

@Component({
  // eslint-disable-next-line
  selector: 'app-menu',
  template: `
    <ul class="remote-menu">
      <li><a routerLink="/">Home</a></li>
      <li><a routerLink="extension1">Extension1</a></li>
      <li *ngIf="loggedIn$ | async"><a href="/logout" (click)="onLogoutClick($event)">Logout</a></li>
      <li *ngIf="(loggedIn$ | async) === false"><a href="/login" (click)="onLoginClick($event)">Login</a></li>
    </ul>`
})
export class MenuComponent {
  public loggedIn$: Observable<boolean>;

  constructor(@Inject(AuthenticationServiceToken) private authService: AuthenticationService) {
    this.loggedIn$ = authService.loggedIn$;
  }

  onLogoutClick(event: Event) {
    event.preventDefault();
    this.authService.logout();
  }

  onLoginClick(event: Event) {
    event.preventDefault();
    this.authService.login();
  }
}
