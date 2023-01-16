import { Package } from "./store";

export const fakePackages: Package[] = [
  {
    name: "Basic Template",
    package: "@acme/basic-template",
    scope: "@acme",
    thumbnail: "/assets/hxp-template.png",
    version: "3.0.3",
    cost: 0,
    rating: 4.5,
    type: "template"
  },
  {
    name: "Dashboard",
    package: "@ng-visionaires/dashboard",
    scope: "@ng-visionaires",
    thumbnail: "/assets/dashboard.png",
    version: "1.7.0",
    cost: 24.9,
    rating: 3,
    type: "component"
  },
  {
    name: "Static pages",
    package: "@ng-visionaires/static-pages",
    scope: "@ng-visionaires",
    thumbnail: "/assets/static-pages.png",
    version: "0.6.9",
    cost: 13.9,
    rating: 4.5,
    type: "component"
  },
  {
    name: "Custom sidebar",
    package: "@ng-visionaires/custom-sidebar",
    scope: "@ng-visionaires",
    thumbnail: "/assets/dark-sidebar.png",
    version: "0.0.9",
    cost: 9.5,
    rating: 4,
    type: "widget"
  },
  {
    name: "Legacy compatibility",
    package: "@ng-visionaires/legacy-extensions",
    scope: "@ng-visionaires",
    thumbnail: "/assets/legacy-extensions.png",
    version: "0.6.9",
    cost: 0,
    rating: 3,
    type: "plugin"
  }
]
