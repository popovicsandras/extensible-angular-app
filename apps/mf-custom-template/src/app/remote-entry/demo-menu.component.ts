import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line
  selector: 'demo-menu',
  template: `
    <ul class="remote-menu">
      <li><a routerLink="/">Home</a></li>
      <li><a routerLink="/">Navigation 1</a></li>
      <li><a routerLink="/">Navigation 2</a></li>
    </ul>`
})
export class DemoMenuComponent {}
