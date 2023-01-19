import { Package } from "./store";

export const fakePackages: Package[] = [
  {
    displayName: "Basic Template",
    package: "basic-template",
    scope: "@acme",
    thumbnail: "/assets/hxp-template.png",
    version: "3.0.3",
    cost: 0,
    rating: 4.5,
    type: "template",
    exposedModules: [],
    schema: {}
  },
  {
    displayName: "Dashboard",
    package: "dashboard",
    scope: "@ng-visionaires",
    thumbnail: "/assets/dashboard.png",
    version: "1.7.0",
    cost: 24.9,
    rating: 3,
    type: "component",
    exposedModules: [],
    schema: {}
  },
  {
    displayName: "Static pages",
    package: "static-pages",
    scope: "@ng-visionaires",
    thumbnail: "/assets/static-pages.png",
    version: "0.6.9",
    cost: 13.9,
    rating: 4.5,
    type: "component",
    exposedModules: [],
    schema: {}
  },
  {
    displayName: "Custom sidebar",
    package: "custom-sidebar",
    scope: "@ng-visionaires",
    thumbnail: "/assets/dark-sidebar.png",
    version: "0.0.9",
    cost: 9.5,
    rating: 4,
    type: "widget",
    exposedModules: [],
    schema: {}
  },
  {
    displayName: "Legacy compatibility",
    package: "legacy-extensions",
    scope: "@ng-visionaires",
    thumbnail: "/assets/legacy-extensions.png",
    version: "0.6.9",
    cost: 0,
    rating: 3,
    type: "plugin",
    exposedModules: [],
    schema: {}
  }
]
