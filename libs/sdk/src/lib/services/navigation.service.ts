import { Injectable } from '@angular/core';
import { MenuItem, NavigationService } from '../tokens/navigation.interfaces';

@Injectable()
export class NavigationServiceImpl implements NavigationService {

  private menuItems: MenuItem[] = [];

  addMenuItem(item: MenuItem) {
    this.menuItems.push(item);
  }

  getMenuItems() {
    return this.menuItems;
  }
}
