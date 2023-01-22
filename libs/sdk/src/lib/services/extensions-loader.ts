import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { loadRemoteModule } from '@nrwl/angular/mf';
import { ExtensionConfig } from "./extensions.interface";
import { RouterService } from "./router.service";
import { ApplicationSlotService, ApplicationSlotServiceToken } from "../tokens/application-slot.interfaces";

export function loadExtensionsFactory(extensionsLoaderService: ExtensionsLoaderService): () => Observable<any> {
  return () => extensionsLoaderService.load();
}

declare const CONFIG_ID: string;

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
    // return this.httpClient.get(`http://localhost:4000/api/ui/${CONFIG_ID}/config`)
    return this.httpClient.get("config/application.json")
      .pipe(
         switchMap((config) => from(this.loadRemoteModule(config as ExtensionConfig)))
      );
   }

   async loadRemoteModule(config: ExtensionConfig) {
    if (config.template) {
      const module = await loadRemoteModule(config.template.remoteName, config.template.exposedModule);

      this.applicationSlotService.set(
        'template',
        module[config.template.componentName],
        config.template.options ?? {}
      );
    }

    if (config.components) {
      this.routerService.buildRoutes(config.components);
    }
   }
}
