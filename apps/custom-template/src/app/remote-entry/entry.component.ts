import { Component, Inject } from '@angular/core';
import { DemoComponent } from './demo.component';
import { AppTemplateComponent } from '@extensible-angular-app/template';
import { ApplicationSlotService, ApplicationSlotServiceToken } from '@extensible-angular-app/sdk';
import { DemoMenuComponent } from './demo-menu.component';

@Component({
  standalone: true,
  imports: [
    AppTemplateComponent,
    DemoComponent
  ],
  selector: 'extensible-app-custom-template-entry',
  template: `<app-template title="Template showcase"></app-template>`,
})
export class RemoteEntryComponent {
  constructor(@Inject(ApplicationSlotServiceToken) private applicationSlotService: ApplicationSlotService) {
    this.applicationSlotService.set(
      'menu',
      DemoMenuComponent,
      {}
    );
  }
}
