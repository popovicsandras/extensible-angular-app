import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from '../tokens/authentication.interfaces';

@Injectable()
export class DefaultAuthenticationService implements AuthenticationService {

  private authState$: BehaviorSubject<boolean>;
  public loggedIn$: Observable<boolean>;

  constructor() {
    const auth = JSON.parse(window.localStorage.getItem('auth') || 'false');
    this.authState$ = new BehaviorSubject<boolean>(auth);
    this.loggedIn$ = this.authState$.asObservable();
  }

  login() {
    window.localStorage.setItem('auth', 'true');
    this.authState$.next(true);
  }

  logout() {
    window.localStorage.setItem('auth', 'false');
    this.authState$.next(false);
  }
}
