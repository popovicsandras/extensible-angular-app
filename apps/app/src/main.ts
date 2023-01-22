import { setRemoteDefinitions } from '@nrwl/angular/mf';
import { environment } from './environments/environment';

declare const EXTENSIONS_ENDPOINT: string;

if (environment.production) {
  import('./bootstrap');
} else {
  fetch(EXTENSIONS_ENDPOINT)
  .then((res) => res.json())
  .then((definitions) => setRemoteDefinitions(definitions))
  .then(() => import('./bootstrap')
  .catch((err) => console.error(err)));
}

