import { Component, Inject } from '@angular/core';
import { DemoComponent } from './demo.component';
import { AppTemplateComponent } from '@extensible-angular-app/custom-template';
import { NavigationService, NavigationServiceToken } from '@extensible-angular-app/sdk';

@Component({
  standalone: true,
  imports: [
    AppTemplateComponent,
    DemoComponent
  ],
  selector: 'extensible-app-custom-template-entry',
  template: `<app-template title="Template"></app-template>`,
})
export class RemoteEntryComponent {
  constructor(@Inject(NavigationServiceToken) navigationService: NavigationService) {
    navigationService.addMenuItem({
      title: 'Dashboard',
      url: 'dashboard',
      icon: 'av_timer'
    });

    navigationService.addMenuItem({
      title: 'Files',
      url: 'files',
      icon: 'view_list'
    });

    navigationService.addMenuItem({
      title: 'Processes',
      url: 'processes',
      icon: 'blur_circular'
    });

    navigationService.addMenuItem({
      title: '403',
      url: '403',
      icon: 'error'
    });
  }
}
