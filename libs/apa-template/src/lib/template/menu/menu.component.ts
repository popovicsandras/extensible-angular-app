import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { AuthenticationService, AuthenticationServiceToken, MenuItem, NavigationService, NavigationServiceToken } from '@extensible-angular-app/sdk';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  /* eslint-disable-next-line @angular-eslint/component-selector */
  selector: 'sidenav-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    RouterModule
  ]
})
export class MenuComponent {
  public loggedIn$: Observable<boolean>;
  public menuItems$: Observable<MenuItem[]>;

  constructor(
    @Inject(AuthenticationServiceToken) private authService: AuthenticationService,
    @Inject(NavigationServiceToken) navigationService: NavigationService
  ) {
    this.loggedIn$ = authService.loggedIn$;
    this.menuItems$ = navigationService.getMenuItems();
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
