import { Injectable, Type } from "@angular/core";
import { ApplicationSlotService } from "@extensible-angular-app/sdk";

@Injectable()
export class ApplicationSlotServiceImpl implements ApplicationSlotService {

  private slots;

  constructor() {
    this.slots = new Map<string, Type<any>>();
  }

  set(slot: string, component: Type<any>) {
    this.slots.set(slot, component);
  }

  get(slot: string) {
    return this.slots.get(slot);
  }

  has(slot: string) {
    return this.slots.has(slot);
  }
}
