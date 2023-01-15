import { APP_INITIALIZER, enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from './environments/environment';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { BaseAppModule, ExtensionsLoaderService, loadExtensionsFactory } from '@extensible-angular-app/sdk';
import { HttpClientModule } from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule,
      RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' }),
      BaseAppModule.forRoot(),
      HttpClientModule,
    ),
    ...(!environment.production ? [ {
      provide: APP_INITIALIZER,
      useFactory: loadExtensionsFactory,
      multi: true,
      deps: [ ExtensionsLoaderService ]
    } ] : [ ])
  ],
});
