import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";

export interface MenuItem {
  title: string;
  url: string;
  icon?: string;
  protected: boolean;
}

export interface NavigationService {
  addMenuItem(item: MenuItem): void;
  getMenuItems(): Observable<MenuItem[]>;
}

export const NavigationServiceToken = new InjectionToken<NavigationService>('navigation-service');
