import { Inject, NgModule } from '@angular/core';
import { ApplicationSlotService, ApplicationSlotServiceToken } from '@extensible-angular-app/sdk';
// import { AppTemplateComponent } from '@extensible-angular-app/template';
/*${IMPORTS}*/

@NgModule({
  imports: [
    /*${MODULE_IMPORTS}*/
  ],
})
export class ProductionBuildModule {
  constructor(
    @Inject('config') private config: any,
    @Inject(ApplicationSlotServiceToken) private applicationSlotService: ApplicationSlotService
  ) {
    /*${MODULE_CONSTRUCTOR}*/
  }
}
