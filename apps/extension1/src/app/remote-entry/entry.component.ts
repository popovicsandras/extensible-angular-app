import { Component, Inject, OnInit } from '@angular/core';
import {
  ApplicationSlotService,
  ApplicationSlotServiceToken,
} from '@extensible-angular-app/sdk';

@Component({
  selector: 'extensible-app-extension1-entry',
  template: `<extensible-app-nx-welcome></extensible-app-nx-welcome>`,
})
export class RemoteEntryComponent implements OnInit {
  constructor(@Inject(ApplicationSlotServiceToken) private applicationSlotService: ApplicationSlotService) {}

  ngOnInit() {
    console.log(this.applicationSlotService);
  }
}
