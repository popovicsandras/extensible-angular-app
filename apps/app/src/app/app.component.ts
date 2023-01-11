import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  ApplicationSlotService,
  ApplicationSlotServiceToken,
  AppSlotDirective
} from '@extensible-angular-app/sdk';
import { BaseAppModule } from '@extensible-angular-app/sdk';

import { TemplateComponent } from './template.component';
import { ProductionBuildModule } from './production-build.module';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    BaseAppModule,
    CommonModule,
    ...(environment.production ? [ ProductionBuildModule ] : [ ])
  ],
  selector: 'extensible-app-root',
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
