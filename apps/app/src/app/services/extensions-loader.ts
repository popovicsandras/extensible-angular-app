import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export function loadPluginsFactory(extensionsLoaderService: ExtensionsLoaderService): () => Observable<any> {
  return () => extensionsLoaderService.load();
}


@Injectable({
  providedIn: 'root'
})
export class ExtensionsLoaderService {

  constructor(private httpClient: HttpClient) {}

  load(): Observable<any> {
    return this.httpClient.get("/assets/config.json")
      .pipe(
         tap(config => {
          console.log(config);
         })
      );
   }
}
