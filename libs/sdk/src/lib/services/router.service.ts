import { loadRemoteModule } from '@nrwl/angular/mf';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService, NavigationServiceToken } from '../tokens/navigation.interfaces';
import { ComponentConfig } from './extensions.interface';
import { Observable } from 'rxjs';
import { authGuard } from '../guards/auth.guard';
interface ClassicModuleRoute {
  path: string;
  loadChildren: () => Promise<any>
}

type Guard = () => Observable<boolean>;
interface StandaloneComponentRoute {
  path: string;
  loadComponent: () => Promise<any>;
  canActivate?: Guard[];
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
          }),
          ...(component.options.protected ? {
            canActivate: [ authGuard ]
          } : {})
        });
        this.navigationService.addMenuItem({
          title: component.options.title,
          url: component.options.route,
          icon: component.options.icon,
          protected: component.options.protected
        });
      });

      this.router.resetConfig([...this.router.config, ...routes]);
    }
}
