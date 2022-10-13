import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { loadRemoteModule } from '@angular-architects/module-federation';
import { ApplicationSlotService, ApplicationSlotServiceToken } from "@extensible-angular-app/sdk";

export function loadPluginsFactory(extensionsLoaderService: ExtensionsLoaderService): () => Observable<any> {
  return () => extensionsLoaderService.load();
}

@Injectable({
  providedIn: 'root'
})
export class ExtensionsLoaderService {

  constructor(
    private httpClient: HttpClient,
    @Inject(ApplicationSlotServiceToken) private applicationSlotService: ApplicationSlotService
  ) {}

  load(): Observable<any> {
    return this.httpClient.get("/assets/config.json")
      .pipe(
         switchMap((config) => from(this.loadRemoteModule(config)))
      );
   }

   async loadRemoteModule(config: any) {
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
   }
}
