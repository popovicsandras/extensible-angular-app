import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {
  BaseAppModule,
} from '@extensible-angular-app/sdk';

import { AppComponent } from './components/app.component';
import { NxWelcomeComponent } from './components/nx-welcome.component';
import { MenuComponent } from './components/menu.component';
import { PreviewBuildModule } from './preview-build.module';
import { environment } from '../environments/environment';
import { ProductionBuildModule } from './production-build.module';
import { default as config } from '../assets/config.json';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, MenuComponent],
  imports: [
    BaseAppModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ...(environment.production ? [ ProductionBuildModule ] : [ PreviewBuildModule ]),
    RouterModule.forRoot(
      [ { path: '', component: NxWelcomeComponent } ]
    ),
  ],
  providers: [
    { provide: 'config', useValue: config }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
