import { Component } from '@angular/core';
import { MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppSlotDirective } from '@extensible-angular-app/sdk';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    AppSlotDirective
  ],
  // eslint-disable-next-line
  selector: 'app-template',
  templateUrl: './template.component.html'
})
export class AppTemplateComponent {}
