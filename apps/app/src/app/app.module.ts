import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { BaseAppModule } from '@extensible-angular-app/sdk';

import { AppComponent } from './components/app.component';
import { MenuComponent } from './components/menu.component';
import { PreviewBuildModule } from './preview-build.module';
import { ProductionBuildModule } from './production-build.module';
import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [AppComponent, MenuComponent],
  imports: [
    RouterModule.forRoot(appRoutes),
    BaseAppModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ...(environment.production ? [ ProductionBuildModule ] : [ PreviewBuildModule ])
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
