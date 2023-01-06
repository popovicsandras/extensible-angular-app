import { loadRemoteModule } from '@angular-architects/module-federation';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService, NavigationServiceToken } from '@extensible-angular-app/sdk';
import { ComponentConfig } from './extensions.interface';

@Injectable({ providedIn: 'root' })
export class RouterService {
    constructor(
      private router: Router,
      @Inject(NavigationServiceToken) private navigationService: NavigationService
    ) {}

    buildRoutes(routedComponents: ComponentConfig[]): void {
      const routes = [] as { path: string; loadChildren: () => Promise<any> }[];

      routedComponents.forEach(component => {
        routes.push({
          path: component.options.route,
          loadChildren: () =>
            loadRemoteModule({
                type: 'module',
                remoteEntry: component.remoteEntry,
                exposedModule: component.exposedModule
            })
            .then(m => m.RemoteEntryModule)
        });
        this.navigationService.addMenuItem({
          title: component.options.title,
          url: component.options.route
        });
      });

      this.router.resetConfig([...this.router.config, ...routes]);
    }
}
