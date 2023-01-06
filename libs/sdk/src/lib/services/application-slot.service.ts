import { Injectable, Type } from "@angular/core";
import { ApplicationSlotService, SlotRecord } from "@extensible-angular-app/sdk";

@Injectable()
export class ApplicationSlotServiceImpl implements ApplicationSlotService {

  private slots;

  constructor() {
    this.slots = new Map<string, SlotRecord>();
  }

  set(slot: string, component: Type<unknown>, options: Record<string, unknown>) {
    this.slots.set(slot, {
      component,
      options
    });
  }

  get(slot: string) {
    return this.slots.get(slot);
  }

  has(slot: string) {
    return this.slots.has(slot);
  }
}
