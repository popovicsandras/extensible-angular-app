import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationServiceToken } from '../tokens/authentication.interfaces';

export const authGuard = () => {
  const authService = inject(AuthenticationServiceToken);
  const router = inject(Router);

  return authService.loggedIn$.pipe(
    tap(loggedIn => {
      if (!loggedIn) {
        router.navigateByUrl('/403');
      }
    })
  );
};
