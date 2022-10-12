import { InjectionToken, Type } from "@angular/core";

// Injection token or class can not be used here, because the R3Injector internally uses a Map to store the providers.
// Hence the only way to reference a provider from a dynamic extension is via primitive types

// export const ApplicationSlotServiceToken = new InjectionToken<ApplicationSlotService>('application-slot-service');
export const ApplicationSlotServiceToken = 'application-slot-service';

export interface ApplicationSlotService {
  set(slot: string, component: Type<any>): void;
  get(slot: string): Type<any> | undefined;
  has(slot: string): boolean;
}
