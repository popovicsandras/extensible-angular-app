import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { ApplicationSlotServiceImpl } from './services/application-slot.service';
import { MenuComponent } from './menu.component';
import { ApplicationSlotServiceToken, AppSlotDirective } from '@extensible-angular-app/sdk';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, MenuComponent],
  imports: [
    AppSlotDirective,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        {
          path: 'extension1',
          loadChildren: () =>
            import('extension1/Module').then((m) => m.RemoteEntryModule),
        },
        {
          path: '',
          component: NxWelcomeComponent,
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [
    { provide: ApplicationSlotServiceToken, useClass: ApplicationSlotServiceImpl }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
