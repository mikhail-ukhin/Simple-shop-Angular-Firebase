import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.auth.$user.map(user => {
      if (user) {
        return true;
      }

      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

      return false;
    });
  }

  constructor(private auth: AuthService, private router: Router) { }

}
