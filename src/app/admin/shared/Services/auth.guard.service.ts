import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {AuthService} from './auth.service';
import { ROUTE_CONFIGS } from '../../../utils/constants/route.consts';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  public  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      this.redirect();
      return false;
    }
  }

  private redirect(): void {
    this.auth.logOut();
    this.router.navigate([
      ROUTE_CONFIGS.adminPage.fullpath,
      ROUTE_CONFIGS.adminLogin.path
    ], {
      queryParams: {
        loginAgain: true
      }
    })
  }
}
