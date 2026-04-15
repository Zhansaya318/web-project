import { Injectable } from '@angular/core';

interface User {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'auth_token';
  private usersKey = 'users';
  private currentUserKey = 'current_user';

  getUsers(): User[] {
    const users = localStorage.getItem(this.usersKey);
    return users ? JSON.parse(users) : [];
  }

  saveUsers(users: User[]) {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  register(username: string, email: string, password: string): boolean {
    const users = this.getUsers();

    const existingUser = users.find(
      u => u.email === email || u.username === username
    );

    if (existingUser) {
      return false;
    }

    users.push({ username, email, password });
    this.saveUsers(users);
    return true;
  }

  login(identifier: string, password: string): boolean {
    const users = this.getUsers();

    const user = users.find(
      u =>
        (u.email === identifier || u.username === identifier) &&
        u.password === password
    );

    if (!user) {
      return false;
    }

    localStorage.setItem(this.tokenKey, 'fake-jwt-token');
    localStorage.setItem(this.currentUserKey, user.username); // сохраняем username
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.currentUserKey);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.tokenKey) !== null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getCurrentUser(): string | null {
    return localStorage.getItem(this.currentUserKey);
  }
}