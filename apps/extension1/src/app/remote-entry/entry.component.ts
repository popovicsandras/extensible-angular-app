import { Component, Inject } from '@angular/core';
import {
  ApplicationSlotService,
  ApplicationSlotServiceToken,
} from '@extensible-angular-app/sdk';

@Component({
  selector: 'extensible-app-extension1-entry',
  template: `<extensible-app-nx-welcome></extensible-app-nx-welcome>`,
})
export class RemoteEntryComponent {
  constructor(@Inject(ApplicationSlotServiceToken) private applicationSlotService: ApplicationSlotService) {
    console.log(this.applicationSlotService);
  }
}
