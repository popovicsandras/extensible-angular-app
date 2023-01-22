import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { BaseAppModule, ExtensionsLoaderService, loadExtensionsFactory } from '@extensible-angular-app/sdk';
import { appRoutes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule,
      RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' }),
      BaseAppModule.forRoot(),
      HttpClientModule,
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: loadExtensionsFactory,
      multi: true,
      deps: [ ExtensionsLoaderService ]
    }
  ],
});
