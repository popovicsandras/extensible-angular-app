import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseAppModule, SlotComponent } from '@extensible-angular-app/sdk';
import { HttpClientModule } from '@angular/common/http';
import { AppTemplateComponent } from '@extensible-angular-app/custom-template';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BaseAppModule.forRoot(),
    AppTemplateComponent,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '403', component: SlotComponent, data: { slot: '403' } },
      {
        path: '',
        loadChildren: () =>
          import('../lib/lazy.module').then(
            (m) => m.LazyModule
          ),
      }
    ], { initialNavigation: 'enabledBlocking' })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
