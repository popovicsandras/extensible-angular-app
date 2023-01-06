import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppSlotDirective } from '@extensible-angular-app/sdk';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@Component({
  standalone: true,
  imports: [
    CommonModule,
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
}
