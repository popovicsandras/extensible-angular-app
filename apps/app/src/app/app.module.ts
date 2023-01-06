import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { ApplicationSlotServiceImpl } from './services/application-slot.service';
import { MenuComponent } from './menu.component';

import { ApplicationSlotServiceToken, AppSlotDirective, AuthenticationServiceToken, NavigationServiceToken } from '@extensible-angular-app/sdk';
import { HttpClientModule } from '@angular/common/http';
import { ExtensionsLoaderService, loadPluginsFactory } from './services/extensions-loader';
import { DefaultAuthenticationService } from './services/authentication.service';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { NavigationServiceImpl } from './services/navigation.service';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, MenuComponent],
  imports: [
    AppSlotDirective,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: NxWelcomeComponent,
        },
        {
          path: 'extension1',
          loadChildren: () => {
            return import('extension1/Module' as any).then((m) => {
              console.log('m', m);
              return m.RemoteEntryModule;
            });
          }
        },
        // {
        //   path: 'extension1b',
        //   loadChildren: () => {
        //     debugger;
        //     return import('../../../../dist/apps/extension1/default-apps_extension1_src_app_remote-entry_entry_module_ts/Module' as any).then((m) => {
        //       debugger;
        //       console.log('m', m);
        //       return m.RemoteEntryModule;
        //     });
        //   }
        // },
        // {
        //   path: 'vamonos',
        //   loadChildren: () => {
        //     return loadRemoteModule({
        //       type: 'module',
        //       remoteEntry: 'http://localhost:4201/remoteEntry.mjs',
        //       exposedModule: './Module'
        //     })
        //     .then(m => {
        //       m.RemoteEntryModule;
        //     })
        //   }
        // },
      ]
    ),
  ],
  providers: [
    { provide: ApplicationSlotServiceToken, useClass: ApplicationSlotServiceImpl },
    { provide: AuthenticationServiceToken, useClass: DefaultAuthenticationService },
    { provide: NavigationServiceToken, useClass: NavigationServiceImpl },
    {
      provide: APP_INITIALIZER,
      useFactory: loadPluginsFactory,
      multi: true,
      deps: [ ExtensionsLoaderService ]
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
