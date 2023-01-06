import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { loadRemoteModule } from '@angular-architects/module-federation';
import { ExtensionConfig } from "./extensions.interface";
import { RouterService } from "./router.service";
import { ApplicationSlotService, ApplicationSlotServiceToken } from "../tokens/application-slot.interfaces";

export function loadPluginsFactory(extensionsLoaderService: ExtensionsLoaderService): () => Observable<any> {
  return () => extensionsLoaderService.load();
}

@Injectable({
  providedIn: 'root'
})
export class ExtensionsLoaderService {

  constructor(
    private httpClient: HttpClient,
    private routerService: RouterService,
    @Inject(ApplicationSlotServiceToken) private applicationSlotService: ApplicationSlotService
  ) {}

  load(): Observable<any> {
    return this.httpClient.get("/assets/config.json")
      .pipe(
         switchMap((config) => from(this.loadRemoteModule(config as ExtensionConfig)))
      );
   }

   async loadRemoteModule(config: ExtensionConfig) {
    if (config.template) {
      const module = await loadRemoteModule({
        type: 'module',
        remoteEntry: config.template.remoteEntry,
        exposedModule: config.template.exposedModule
      });

      this.applicationSlotService.set(
        'template',
        module[config.template.componentName],
        config.template.options
      );
    }

    if (config.components) {
      this.routerService.buildRoutes(config.components);
    }
   }
}
