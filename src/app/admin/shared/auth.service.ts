import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from '../../utils/interfaces/ login.interfaces';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
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
      tap(this.setToken)
    );
  }

  public logOut() {
    this.setToken(null);
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: any) {
    if(response) {
      const expiresDate = new Date(new Date().getTime() + Number(response.expiresIn) * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-expire', expiresDate.toString());
    } else {
      localStorage.clear();
    }
  }
}




