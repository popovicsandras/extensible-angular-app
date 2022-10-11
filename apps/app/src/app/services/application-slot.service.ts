import { Injectable, Type } from "@angular/core";
import { ApplicationSlotService } from "@extensible-angular-app/sdk";

@Injectable()
export class ApplicationSlotServiceImpl implements ApplicationSlotService {

  private slots = {} as { [key: string]: Type<any>};

  set(slot: string, component: Type<any>) {
    this.slots[slot] = component;
  }

  get(slot: string) {
    return this.slots[slot];
  }

  has(slot: string) {
    return !!this.slots[slot];
  }
}
