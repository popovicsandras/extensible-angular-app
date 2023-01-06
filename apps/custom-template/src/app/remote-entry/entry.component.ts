import { Component } from '@angular/core';
import { NxWelcomeComponent } from './nx-welcome.component';
import { AppTemplateComponent } from '@extensible-angular-app/template';

@Component({
  standalone: true,
  imports: [
    AppTemplateComponent,
    NxWelcomeComponent
  ],
  selector: 'extensible-app-custom-template-entry',
  template: `<app-template></app-template>`,
})
export class RemoteEntryComponent {}
