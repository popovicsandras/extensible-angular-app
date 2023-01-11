import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Menu, MENUITEMS } from '../menu-items';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { AuthenticationService, AuthenticationServiceToken, MenuItem, NavigationService, NavigationServiceToken } from '@extensible-angular-app/sdk';
import { Observable } from 'rxjs';

@Component({
  /* eslint-disable-next-line @angular-eslint/component-selector */
  selector: 'sidenav-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    RouterModule
  ]
})
export class MenuComponent {
  public loggedIn$: Observable<boolean>;
  public menuItems: MenuItem[];

  constructor(
    @Inject(AuthenticationServiceToken) private authService: AuthenticationService,
    @Inject(NavigationServiceToken) navigationService: NavigationService
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
