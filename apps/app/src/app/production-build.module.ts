/*
  * This file is used as a template by apps/app/scripts/assemble-production-build.js and virtually replaced (fileReplacements)!
  * DO NOT REMOVE THE PLACEHOLDERS FROM THIS FILE!
  * This file is used to build the production version of the application.
  * It is not used in development mode.
*/

import { Inject, NgModule } from '@angular/core';
import {
  ApplicationSlotService,
  ApplicationSlotServiceToken,
  NavigationService,
  NavigationServiceToken
} from '@extensible-angular-app/sdk';
/*${IMPORTS}*/

@NgModule({
  imports: [
    /*${MODULE_IMPORTS}*/
  ]
})
export class ProductionBuildModule {
  constructor(
    @Inject(ApplicationSlotServiceToken) private applicationSlotService: ApplicationSlotService,
    @Inject(NavigationServiceToken) private navigationService: NavigationService
  ) {
    /*${MODULE_CONSTRUCTOR}*/
  }
}
