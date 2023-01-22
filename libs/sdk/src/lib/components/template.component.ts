import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [ RouterModule ],
  // eslint-disable-next-line
  selector: 'default-app-template',
  encapsulation: ViewEncapsulation.None,
  template: `<router-outlet><div class="loader"></div></router-outlet>`
})
export class TemplateComponent { }
