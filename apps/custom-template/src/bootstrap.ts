import { environment } from './environments/environment';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RemoteEntryComponent } from './app/remote-entry/entry.component';
import { RemoteRoutes } from './app/remote-entry/routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ApplicationSlotServiceToken } from '@extensible-angular-app/sdk';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(RemoteEntryComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      RouterModule.forRoot(RemoteRoutes, {
        initialNavigation: 'enabledBlocking',
      })
    ),
    // { provide: ApplicationSlotServiceToken, useClass: ApplicationSlotServiceImpl },
  ],
});
