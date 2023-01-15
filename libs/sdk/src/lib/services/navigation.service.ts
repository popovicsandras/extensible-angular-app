import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService, AuthenticationServiceToken } from '../tokens/authentication.interfaces';
import { MenuItem, NavigationService } from '../tokens/navigation.interfaces';

@Injectable()
export class NavigationServiceImpl implements NavigationService {

  constructor(@Inject(AuthenticationServiceToken) private authenticationService: AuthenticationService) {}

  private menuItems: MenuItem[] = [];

  addMenuItem(item: MenuItem) {
    this.menuItems.push(item);
  }

  getMenuItems(): Observable<MenuItem[]> {
    return this.authenticationService.loggedIn$.pipe(
      map(loggedIn => {
        if (loggedIn) {
          return this.menuItems;
        } else {
          return this.menuItems.filter(item => !item.protected);
        }
      })
    );
  }
}
