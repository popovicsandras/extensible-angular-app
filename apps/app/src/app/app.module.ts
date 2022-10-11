import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule} from '@angular/material/sidenav';
import { AppTemplateComponent } from '../template/template.component';
import { AppSlotDirective } from '../shared/slot.directive';
import { ApplicationSlotService, ApplicationSlotServiceToken } from '../shared/application-slot.service';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, MenuComponent, AppSlotDirective, AppTemplateComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
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
  exports: [
    MatSidenavModule
  ],
  providers: [
    { provide: ApplicationSlotServiceToken, useClass: ApplicationSlotService }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
