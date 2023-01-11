import { NgModule } from "@angular/core";
import { ApplicationSlotServiceToken } from "./tokens/application-slot.interfaces";
import { AuthenticationServiceToken } from "./tokens/authentication.interfaces";
import { NavigationServiceToken } from "./tokens/navigation.interfaces";
import { ApplicationSlotServiceImpl } from "./services/application-slot.service";
import { DefaultAuthenticationService } from "./services/authentication.service";
import { NavigationServiceImpl } from "./services/navigation.service";
import { AppSlotDirective } from "./slot.directive";

@NgModule({
  imports: [
    AppSlotDirective
  ],
  exports: [
    AppSlotDirective
  ],
  declarations: [],
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
}
