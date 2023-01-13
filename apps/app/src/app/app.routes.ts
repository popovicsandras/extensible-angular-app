/*
  * This file is augmented by apps/app/scripts/assemble-production-build.js and virtually replaced (fileReplacements)!
  * DO NOT REMOVE THE PLACEHOLDERS FROM THIS FILE!
  * This file is used to build the production version of the application.
  * It is not used in development mode.
*/

import { SlotComponent, authGuard } from "@extensible-angular-app/sdk";

export const appRoutes = [
  { path: '403', component: SlotComponent, data: { slot: '403' } },
  { path: '404', component: SlotComponent, data: { slot: '404' } },
  /*${WRAPPED_LAZY_MODULE_ROUTES}*/
];
