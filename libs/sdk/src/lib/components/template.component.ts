import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [ RouterModule ],
  // eslint-disable-next-line
  selector: 'default-app-template',
  template: `<router-outlet></router-outlet>`
})
export class TemplateComponent { }
