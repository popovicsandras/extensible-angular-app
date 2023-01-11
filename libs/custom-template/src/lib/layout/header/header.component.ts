import { CommonModule } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthenticationService, AuthenticationServiceToken } from '@extensible-angular-app/sdk';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  /* eslint-disable-next-line @angular-eslint/component-selector */
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppHeaderComponent {
  public loggedIn$: Observable<boolean>;
  constructor(@Inject(AuthenticationServiceToken) private authService: AuthenticationService) {
    this.loggedIn$ = authService.loggedIn$;
  }
}
