import { setRemoteDefinitions } from '@nrwl/angular/mf';
import { environment } from './environments/environment';

if (environment.production) {
  import('./bootstrap');
} else {
  fetch('config/extensions.json')
  .then((res) => res.json())
  .then((definitions) => setRemoteDefinitions(definitions))
  .then(() => import('./bootstrap')
  .catch((err) => console.error(err)));
}

