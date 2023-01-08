/*
  * This file is augmented by apps/app/scripts/assemble-production-build.js and virtually replaced (fileReplacements)!
  * DO NOT REMOVE THE PLACEHOLDERS FROM THIS FILE!
  * This file is used to build the production version of the application.
  * It is not used in development mode.
*/

import { NxWelcomeComponent } from "./components/nx-welcome.component";

export const appRoutes = [
  { path: '', component: NxWelcomeComponent },
  /*${WRAPPED_LAZY_MODULE_ROUTES}*/
];
