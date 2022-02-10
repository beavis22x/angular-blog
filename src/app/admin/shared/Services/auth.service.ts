import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from '../../../utils/interfaces/admin-panel.interfaces';
import { environment } from '../../../../environments/environment';
import { EMAIL_NOT_FOUND, INVALID_PASSWORD } from '../../../utils/constants/error.consts';

@Injectable({providedIn: 'root'})
export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  get token(): string | null {
    const expDate = new Date(<string>localStorage.getItem('fb-token-expire'));

    if(new Date() > expDate) {
      this.logOut();

      return null;
    }

    return localStorage.getItem('fb-token');
  }

  public logIn(user: User): Observable<any> {
    user.returnSecureToken = true;

    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
      user
    ).pipe(
      tap(this.setToken),
      catchError(this.handleError.bind(this))
    );
  }

  public logOut(): void {
    this.setToken(null);
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

   public handleError(error: HttpErrorResponse): any {
    const {message} = error?.error?.error;

     switch(message) {
       case INVALID_PASSWORD:
         this.error$.next('Неверный пароль')
         break;
       case EMAIL_NOT_FOUND:
         this.error$.next('Данный email не зарегистрирован')
         break;
     }
  }

  private setToken(response: any): void {
    if(response) {
      const expiresDate = new Date(new Date().getTime() + Number(response.expiresIn) * 1000);

      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-expire', expiresDate.toString());
    } else {
      localStorage.clear();
    }
  }
}




