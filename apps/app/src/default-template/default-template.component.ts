import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppSlotDirective } from '@extensible-angular-app/sdk';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AppSlotDirective,
    MatToolbarModule
  ],
  // eslint-disable-next-line
  selector: 'app-template',
  templateUrl: './default-template.component.html',
  styleUrls: ['./default-template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DefaultAppTemplateComponent {}
