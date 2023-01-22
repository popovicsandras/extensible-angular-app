import { setRemoteDefinitions } from '@nrwl/angular/mf';

declare const EXTENSIONS_ENDPOINT: string;

fetch(EXTENSIONS_ENDPOINT)
  .then((res) => res.json())
  .then((definitions) => setRemoteDefinitions(definitions))
  .then(() => import('./bootstrap')
  .catch((err) => console.error(err)));

