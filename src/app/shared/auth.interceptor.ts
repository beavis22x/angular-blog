import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';

import {catchError, tap} from 'rxjs/operators';
import { AuthService } from '../admin/shared/auth.service';
import { ROUTE_CONFIGS } from '../utils/constants/route.consts';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      const par: any = {
        auth: this.auth.token
      }
      req = req.clone({
        setParams: par
      })
    }
    return next.handle(req)
      .pipe(
        tap(() => {
          console.log('Intercept')
        }),
        catchError((error: HttpErrorResponse) => {
          console.log('[Interceptor Error]: ', error)
          if (error.status === 401) {
            this.auth.logOut()
            this.router.navigate([
              ROUTE_CONFIGS.adminPage.fullpath,
              ROUTE_CONFIGS.adminLogin.path
            ], {
              queryParams: {
                authFailed: true
              }
            })
          }
          return throwError(error)
        })
      )
  }
}
