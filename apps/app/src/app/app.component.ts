import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  ApplicationSlotService,
  ApplicationSlotServiceToken,
  AppSlotDirective
} from '@extensible-angular-app/sdk';
import { DefaultAppTemplateComponent } from '../default-template/default-template.component';
import { MenuComponent } from './menu.component';

@Component({
  selector: 'extensible-app-root',
  template: `<ng-template slot="template"></ng-template>`,
})
export class AppComponent implements OnInit {
  @ViewChild(AppSlotDirective, {static: true}) slot!: AppSlotDirective;

  constructor(@Inject(ApplicationSlotServiceToken) private applicationSlotService: ApplicationSlotService) {
  }

  ngOnInit() {
    if (!this.applicationSlotService.has('template')) {
      this.applicationSlotService.set('template', DefaultAppTemplateComponent);
    }
    this.applicationSlotService.set('menu', MenuComponent);
  }
}
