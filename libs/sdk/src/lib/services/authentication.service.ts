import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from '../tokens/authentication.interfaces';

@Injectable()
export class DefaultAuthenticationService implements AuthenticationService {

  private authState$: BehaviorSubject<boolean>;
  public loggedIn$: Observable<boolean>;

  constructor(private router: Router) {
    const auth = JSON.parse(window.localStorage.getItem('auth') || 'false');
    this.authState$ = new BehaviorSubject<boolean>(auth);
    this.loggedIn$ = this.authState$.asObservable();
  }

  login() {
    window.localStorage.setItem('auth', 'true');
    this.authState$.next(true);
    this.refresh();
  }

  logout() {
    window.localStorage.setItem('auth', 'false');
    this.authState$.next(false);
    this.refresh();
  }

  refresh() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
}
