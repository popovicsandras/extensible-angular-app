import { InjectionToken } from "@angular/core";

export interface MenuItem {
  title: string;
  url: string;
}

export interface NavigationService {
  addMenuItem(item: MenuItem): void;
  getMenuItems(): MenuItem[];
}

export const NavigationServiceToken = new InjectionToken<NavigationService>('navigation-service');
