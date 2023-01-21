import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  ApplicationSlotService,
  ApplicationSlotServiceToken,
  AppSlotDirective,
  TemplateComponent
} from '@extensible-angular-app/sdk';
import { BaseAppModule } from '@extensible-angular-app/sdk';

import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    BaseAppModule,
    CommonModule
  ],
  selector: 'preview',
  template: `<ng-template slot="template"></ng-template>`,
})
export class AppComponent implements OnInit {
  @ViewChild(AppSlotDirective, {static: true}) slot!: AppSlotDirective;

  constructor(@Inject(ApplicationSlotServiceToken) private applicationSlotService: ApplicationSlotService) {}

  ngOnInit() {
    if (!this.applicationSlotService.has('template')) {
      this.applicationSlotService.set('template', TemplateComponent, {});
    }
  }
}
