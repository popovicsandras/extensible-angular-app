import { InjectionToken, Type } from "@angular/core";


export const ApplicationSlotServiceToken = new InjectionToken<ApplicationSlotService>('application-slot-service');
export interface ApplicationSlotService {
  set(slot: string, component: Type<any>): void;
  get(slot: string): Type<any>;
  has(slot: string): boolean;
}
