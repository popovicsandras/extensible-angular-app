import { loadRemoteModule } from '@nrwl/angular/mf';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService, NavigationServiceToken } from '../tokens/navigation.interfaces';
import { ComponentConfig } from './extensions.interface';
interface ClassicModuleRoute {
  path: string;
  loadChildren: () => Promise<any>
}

interface StandaloneComponentRoute {
  path: string;
  loadComponent: () => Promise<any>
}
@Injectable({ providedIn: 'root' })
export class RouterService {
    constructor(
      private router: Router,
      @Inject(NavigationServiceToken) private navigationService: NavigationService
    ) {}

    buildRoutes(routedComponents: ComponentConfig[]): void {
      const routes = [] as (ClassicModuleRoute | StandaloneComponentRoute)[];

      routedComponents.forEach(component => {
        routes.push({
          path: component.options.route,
          ...(component.standalone ? {
            loadComponent: () =>
              loadRemoteModule(component.remoteName, component.exposedModule)
                .then(m => m[component.componentName])
          } : {
            loadChildren: () =>
              loadRemoteModule(component.remoteName, component.exposedModule)
                .then(m => m[component.componentName])
          })
        });
        this.navigationService.addMenuItem({
          title: component.options.title,
          url: component.options.route
        });
      });

      this.router.resetConfig([...this.router.config, ...routes]);
    }
}
