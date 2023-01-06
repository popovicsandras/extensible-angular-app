import { APP_INITIALIZER, NgModule } from '@angular/core';

import {
  ExtensionsLoaderService,
  loadExtensionsFactory
} from '@extensible-angular-app/sdk';

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadExtensionsFactory,
      multi: true,
      deps: [ ExtensionsLoaderService ]
    }
  ]
})
export class PreviewBuildModule {}
