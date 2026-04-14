import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'auth_token';

  login(email: string, password: string): boolean {

    // fake login (пока без backend)

    if (email === 'test@test.com' && password === '1234') {

      const fakeToken = 'fake-jwt-token';

      localStorage.setItem(this.tokenKey, fakeToken);

      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.tokenKey) !== null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

}