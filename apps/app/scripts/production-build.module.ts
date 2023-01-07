import { Inject, NgModule } from '@angular/core';
import { ApplicationSlotService, ApplicationSlotServiceToken } from '@extensible-angular-app/sdk';
/*${IMPORTS}*/

@NgModule({
  imports: [
    /*${MODULE_IMPORTS}*/
  ]
})
export class ProductionBuildModule {
  constructor(@Inject(ApplicationSlotServiceToken) private applicationSlotService: ApplicationSlotService) {
    /*${MODULE_CONSTRUCTOR}*/
  }
}
