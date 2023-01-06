import { Inject, NgModule } from '@angular/core';
import { ApplicationSlotService, ApplicationSlotServiceToken } from '@extensible-angular-app/sdk';

@NgModule({
  imports: [
  ],
})
export class ProductionBuildModule {
  constructor(
    @Inject('config') private config: any,
    @Inject(ApplicationSlotServiceToken) private applicationSlotService: ApplicationSlotService
  ) {}
}
