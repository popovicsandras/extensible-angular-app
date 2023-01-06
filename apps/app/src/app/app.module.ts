import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { BaseAppModule } from '@extensible-angular-app/sdk';

import { AppComponent } from './components/app.component';
import { NxWelcomeComponent } from './components/nx-welcome.component';
import { MenuComponent } from './components/menu.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, MenuComponent],
  imports: [
    BaseAppModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: NxWelcomeComponent,
        }
      ]
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
