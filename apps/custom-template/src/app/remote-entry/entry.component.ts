import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'extensible-app-custom-template-entry',
  template: `<extensible-app-nx-welcome></extensible-app-nx-welcome>`,
})
export class RemoteEntryComponent {}
