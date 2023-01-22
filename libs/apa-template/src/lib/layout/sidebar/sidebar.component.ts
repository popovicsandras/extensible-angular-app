import { ChangeDetectorRef, Component, Inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { AppSlotDirective, AuthenticationService, AuthenticationServiceToken } from '@extensible-angular-app/sdk';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  /* eslint-disable-next-line @angular-eslint/component-selector */
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [
    MatIconModule,
    AppSlotDirective,
    MatMenuModule,
    CommonModule,
    FormsModule,
    MenuComponent
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  public loggedIn$: Observable<boolean>;

  private _mobileQueryListener: () => void;

  constructor(
    @Inject(AuthenticationServiceToken) private authService: AuthenticationService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.loggedIn$ = authService.loggedIn$;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
