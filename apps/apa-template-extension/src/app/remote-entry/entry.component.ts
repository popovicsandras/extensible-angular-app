import { Component, Inject } from '@angular/core';
import { DemoComponent } from './demo.component';
import { AppTemplateComponent } from '@alfresco/apa-template';
import { NavigationService, NavigationServiceToken } from '@extensible-angular-app/sdk';

@Component({
  standalone: true,
  imports: [
    AppTemplateComponent,
    DemoComponent
  ],
  selector: 'extensible-app-apa-template-entry',
  template: `<app-template title="Template"></app-template>`,
})
export class RemoteEntryComponent {
  constructor(@Inject(NavigationServiceToken) navigationService: NavigationService) {
    navigationService.addMenuItem({
      title: 'Dashboard',
      url: 'dashboard',
      icon: 'av_timer',
      protected: false
    });

    navigationService.addMenuItem({
      title: 'Files',
      url: 'files',
      icon: 'view_list',
      protected: false
    });

    navigationService.addMenuItem({
      title: 'Processes',
      url: 'processes',
      icon: 'blur_circular',
      protected: false
    });

    navigationService.addMenuItem({
      title: '403',
      url: '403',
      icon: 'error',
      protected: false
    });
  }
}
