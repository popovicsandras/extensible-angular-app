import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AppSlotDirective } from '@extensible-angular-app/sdk';
import { AppHeaderComponent } from '../header/header.component';
import { Menu, MENUITEMS } from '../menu-items';
import { AppSidebarComponent } from '../sidebar/sidebar.component';
import { SpinnerComponent } from '../spinner.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

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
    FlexLayoutModule
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppTemplateComponent implements OnDestroy {
  @Input()
  title!: string;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  public menuItems: Menu[] = MENUITEMS;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
