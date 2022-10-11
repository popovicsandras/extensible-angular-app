import { Injectable, InjectionToken, Type } from "@angular/core";

@Injectable()
export class ApplicationSlotService {

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

export const ApplicationSlotServiceToken = new InjectionToken<ApplicationSlotService>('application-slot-service');
