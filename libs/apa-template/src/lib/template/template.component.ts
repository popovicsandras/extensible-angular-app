import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import { MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApplicationSlotService, ApplicationSlotServiceToken, AppSlotDirective } from '@extensible-angular-app/sdk';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MenuComponent } from './menu/menu.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MenuComponent,
    RouterModule,
    MatIconModule,
    AppSlotDirective,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule
  ],
  // eslint-disable-next-line
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppTemplateComponent {
  @Input()
  title!: string;

  constructor(
    @Inject(ApplicationSlotServiceToken) private applicationSlotService: ApplicationSlotService
  ) {
    this.applicationSlotService.set('menu', MenuComponent, {});
  }
}
