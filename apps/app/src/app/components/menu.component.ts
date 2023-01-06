import { Component, Inject } from '@angular/core';
import { AuthenticationService, AuthenticationServiceToken, MenuItem, NavigationService, NavigationServiceToken } from '@extensible-angular-app/sdk';
import { Observable } from 'rxjs';

@Component({
  // eslint-disable-next-line
  selector: 'app-menu',
  template: `
    <ul class="remote-menu">
      <li><a routerLink="/">Home</a></li>
      <li *ngFor="let item of menuItems"><a [routerLink]="item.url">{{item.title}}</a></li>
      <li *ngIf="loggedIn$ | async"><a href="/logout" (click)="onLogoutClick($event)">Logout</a></li>
      <li *ngIf="(loggedIn$ | async) === false"><a href="/login" (click)="onLoginClick($event)">Login</a></li>
    </ul>`
})
export class MenuComponent {
  public loggedIn$: Observable<boolean>;
  public menuItems: MenuItem[];

  constructor(
    @Inject(AuthenticationServiceToken) private authService: AuthenticationService,
    @Inject(NavigationServiceToken) private navigationService: NavigationService
  ) {
    this.loggedIn$ = authService.loggedIn$;
    this.menuItems = navigationService.getMenuItems();
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
