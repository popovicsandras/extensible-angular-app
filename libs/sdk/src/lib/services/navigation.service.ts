import { Injectable } from '@angular/core';
import { MenuItem, NavigationService } from '@extensible-angular-app/sdk';

@Injectable()
export class NavigationServiceImpl implements NavigationService {

  private menuItems: {title: string, url: string}[] = [];

  addMenuItem(item: MenuItem) {
    this.menuItems.push(item);
  }

  getMenuItems() {
    return this.menuItems;
  }
}
