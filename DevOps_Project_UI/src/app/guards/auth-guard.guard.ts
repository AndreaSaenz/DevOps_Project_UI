import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UserServicesService } from '../services/user/user-services.service';



export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(UserServicesService);
  const router = inject(Router);

  if (authService.loggedIn()){
    return true;
  }
  router.navigate(['/login']);
  return false;  
};
