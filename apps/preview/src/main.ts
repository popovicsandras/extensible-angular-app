import { setRemoteDefinitions } from '@nrwl/angular/mf';

declare const CONFIG_ID: string;

fetch(`http://localhost:4000/api/ui/${CONFIG_ID}/extensions`)
  .then((res) => res.json())
  .then((definitions) => setRemoteDefinitions(definitions))
  .then(() => import('./bootstrap')
  .catch((err) => console.error(err)));

