import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { ApplicationSlotService, ApplicationSlotServiceToken, AppSlotDirective } from '@extensible-angular-app/sdk';
import { AppHeaderComponent } from '../header/header.component';
import { AppSidebarComponent } from '../sidebar/sidebar.component';
import { SpinnerComponent } from '../spinner.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import { MatButtonModule } from '@angular/material/button';
import { MenuComponent } from '../menu/menu.component';
import { CustomErrorComponent } from '../errors/custom-error.component';

@Component({
  standalone: true,
  /* eslint-disable-next-line @angular-eslint/component-selector */
  selector: 'app-template',
  templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    AppSidebarComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSlotDirective,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    CustomErrorComponent
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppTemplateComponent implements OnDestroy {
  @Input()
  title = 'Unknown app';

  @Input()
  headerColor = '#1e88e5';

  @Input()
  position = true; // true = left, false = right

  @Input()
  floatingSideBar = false;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    @Inject(ApplicationSlotServiceToken) private applicationSlotService: ApplicationSlotService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.applicationSlotService.set('menu', MenuComponent, {});
    this.applicationSlotService.set('403', CustomErrorComponent, { message: 'You are not authorised to access this page.', icon: 'error' });
  }

  get sidebarClass() {
    return this.floatingSideBar ? `floating-sidebar-${this.position ? 'start' : 'end'}` : '';
  }

  get sidebarPosition() {
    return this.position ? 'start' : 'end';
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
