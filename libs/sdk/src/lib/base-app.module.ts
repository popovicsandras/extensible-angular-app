import { APP_INITIALIZER, NgModule } from "@angular/core";
import { ApplicationSlotServiceToken } from "./tokens/application-slot.interfaces";
import { AuthenticationServiceToken } from "./tokens/authentication.interfaces";
import { NavigationServiceToken } from "./tokens/navigation.interfaces";
import { ApplicationSlotServiceImpl } from "./services/application-slot.service";
import { DefaultAuthenticationService } from "./services/authentication.service";
import { ExtensionsLoaderService, loadPluginsFactory } from "./services/extensions-loader";
import { NavigationServiceImpl } from "./services/navigation.service";
import { AppSlotDirective } from "./slot.directive";

@NgModule({
  imports: [
    AppSlotDirective
  ],
  providers: [
    { provide: ApplicationSlotServiceToken, useClass: ApplicationSlotServiceImpl },
    { provide: AuthenticationServiceToken, useClass: DefaultAuthenticationService },
    { provide: NavigationServiceToken, useClass: NavigationServiceImpl },
    {
      provide: APP_INITIALIZER,
      useFactory: loadPluginsFactory,
      multi: true,
      deps: [ ExtensionsLoaderService ]
    }
  ],
  exports: [
    AppSlotDirective
  ],
  declarations: [],
})
export class BaseAppModule {}
