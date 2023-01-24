import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  ApplicationSlotService,
  ApplicationSlotServiceToken,
  AppSlotDirective,
  TemplateComponent
} from '@extensible-angular-app/sdk';
import { BaseAppModule } from '@extensible-angular-app/sdk';

import { CommonModule } from '@angular/common';

import io from 'Socket.IO-client'
let socket;
declare const SOCKET_ENDPOINT;
declare const CONFIG_ID;

@Component({
  standalone: true,
  imports: [
    BaseAppModule,
    CommonModule
  ],
  selector: 'preview',
  template: `<ng-template slot="template"></ng-template>`,
})
export class AppComponent implements OnInit {
  @ViewChild(AppSlotDirective, {static: true}) slot!: AppSlotDirective;

  constructor(@Inject(ApplicationSlotServiceToken) private applicationSlotService: ApplicationSlotService) {}

  ngOnInit() {
    if (!this.applicationSlotService.has('template')) {
      this.applicationSlotService.set('template', TemplateComponent, {});
    }

    this.socketInitializer();
  }

  private async socketInitializer() {
    socket = io(SOCKET_ENDPOINT);
    console.log(`Trying to connect to namespace: ${socket.nsp}`);

    socket.on('connect', () => {
      console.log('connected to socket server');
    });

    socket.on("connect_error", (error) => {
      console.log(error);
    });

    socket.on('refresh', msg => {
      console.log(msg);
      if (msg === CONFIG_ID) {
        window.location.reload();
      }
    })
  }
}
