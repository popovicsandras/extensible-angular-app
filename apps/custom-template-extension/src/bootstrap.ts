import { environment } from './environments/environment';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RemoteEntryComponent } from './app/remote-entry/entry.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseAppModule, SlotComponent } from '@extensible-angular-app/sdk';
import { HttpClientModule } from '@angular/common/http';
import { DemoComponent } from './app/remote-entry/demo.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(RemoteEntryComponent, {

  providers: [
    importProvidersFrom(
      BaseAppModule.forRoot(),
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      RouterModule.forRoot([
        { path: '', component: DemoComponent },
        { path: '403', component: SlotComponent, data: { slot: '403' } },
      ])
    )
  ],
});
