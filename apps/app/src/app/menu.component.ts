import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line
  selector: 'app-menu',
  template: `
    <ul class="remote-menu">
      <li><a routerLink="/">Home</a></li>
      <li><a routerLink="extension1">Extension1</a></li>
    </ul>`
})
export class MenuComponent {}
