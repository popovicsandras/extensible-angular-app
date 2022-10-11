import { Component, Inject, ViewChild } from '@angular/core';
import {
  ApplicationSlotService,
  ApplicationSlotServiceToken,
  AppSlotDirective
} from '@extensible-angular-app/sdk';
import { AppTemplateComponent } from '../template/template.component';
import { MenuComponent } from './menu.component';

@Component({
  selector: 'extensible-app-root',
  template: `<ng-template slot="template"></ng-template>`,
})
export class AppComponent {
  @ViewChild(AppSlotDirective, {static: true}) slot!: AppSlotDirective;

  constructor(@Inject(ApplicationSlotServiceToken) private applicationSlotService: ApplicationSlotService) {
    this.applicationSlotService.set('template', AppTemplateComponent);
    this.applicationSlotService.set('menu', MenuComponent);
  }
}
