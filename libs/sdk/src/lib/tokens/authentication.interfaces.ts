import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";

export interface AuthenticationService {
  loggedIn$: Observable<boolean>;
  login(): void;
  logout(): void;
}

export const AuthenticationServiceToken = new InjectionToken<AuthenticationService>('authentication-service');
