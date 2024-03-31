import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { tap, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { IToken } from '../common/IToken';
import { IUser } from '../common/IUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: IUser | null = null;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  accessToken(): string {
    return this.cookieService.get('accessToken');
  }

  refreshToken(): string {
    return this.cookieService.get('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('accessToken');
  }

  getCurrentUser(): IUser | null {
    return this.currentUser;
  }

  login(loginUser: IUser) {
    return this.http
      .post<IToken>(`${environment.API_URL}/api/identity/login`, loginUser)
      .pipe(
        map((token) => {
          this.currentUser = loginUser;
          this.cookieService.set('accessToken', token.accessToken);
          this.cookieService.set('refreshToken', token.refreshToken);
          return token;
        })
      );
  }

  register(loginUser: IUser) {
    return this.http
      .post<IToken>(`${environment.API_URL}/api/identity/register`, loginUser)
      .pipe(
        map(() => {
          return true;
        })
      );
  }

  logoff() {
    this.currentUser = null;
    this.cookieService.delete('accessToken');
    this.cookieService.delete('refreshToken');
  }

  getRefreshToken() {
    return this.http
      .post<any>(`${environment.API_URL}/api/identity/refresh`, {
        refreshToken: this.refreshToken(),
      })
      .pipe(
        tap((token) => {
          this.cookieService.set('accessToken', token.accessToken);
          this.cookieService.set('refreshToken', token.refreshToken);
        })
      );
  }
}
