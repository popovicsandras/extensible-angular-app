import { Inject, NgModule } from "@angular/core";
import { ApplicationSlotService, ApplicationSlotServiceToken } from "./tokens/application-slot.interfaces";
import { AuthenticationServiceToken } from "./tokens/authentication.interfaces";
import { NavigationServiceToken } from "./tokens/navigation.interfaces";
import { ApplicationSlotServiceImpl } from "./services/application-slot.service";
import { DefaultAuthenticationService } from "./services/authentication.service";
import { NavigationServiceImpl } from "./services/navigation.service";
import { AppSlotDirective } from "./directives/slot.directive";
import { SlotComponent } from "./components/slot.component";
import { ErrorComponent } from "./components/error.component";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    AppSlotDirective,
    CommonModule
  ],
  exports: [
    AppSlotDirective
  ],
  declarations: [
    SlotComponent,
    ErrorComponent
  ],
})
export class BaseAppModule {
  static forRoot() {
    return {
      ngModule: BaseAppModule,
      providers: [
        { provide: ApplicationSlotServiceToken, useClass: ApplicationSlotServiceImpl },
        { provide: AuthenticationServiceToken, useClass: DefaultAuthenticationService },
        { provide: NavigationServiceToken, useClass: NavigationServiceImpl }
      ]
    };
  }

  constructor(@Inject(ApplicationSlotServiceToken) private applicationSlotService: ApplicationSlotService,) {
    this.applicationSlotService.set('403', ErrorComponent, {});
    this.applicationSlotService.set('404', ErrorComponent, {});
  }
}
