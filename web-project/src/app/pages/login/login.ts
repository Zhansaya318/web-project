import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  isRegisterMode = false;
  isLoading = false;

  username = '';
  email = '';
  password = '';
  identifier = '';

  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  switchToLogin() {
    if (this.isLoading) return;
    this.isRegisterMode = false;
    this.errorMessage = '';
    this.successMessage = '';
    this.password = '';
  }

  switchToRegister() {
    if (this.isLoading) return;
    this.isRegisterMode = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.password = '';
  }

  register() {
    if (this.isLoading) return;

    if (!this.username || !this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      this.successMessage = '';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    try {
      const success = this.authService.register(
        this.username.trim(),
        this.email.trim(),
        this.password
      );

      if (!success) {
        this.errorMessage = 'User with this username or email already exists';
        return;
      }

      this.successMessage = 'Account created. Now log in.';
      this.username = '';
      this.email = '';
      this.password = '';
      this.identifier = '';
      this.isRegisterMode = false;
    } catch (error) {
      this.errorMessage = 'Registration failed';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  login() {
    if (this.isLoading) return;

    if (!this.identifier || !this.password) {
      this.errorMessage = 'Enter username/email and password';
      this.successMessage = '';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    try {
      const success = this.authService.login(
        this.identifier.trim(),
        this.password
      );

      if (!success) {
        this.errorMessage = 'Invalid username/email or password';
        return;
      }

      this.router.navigate(['/']);
    } catch (error) {
      this.errorMessage = 'Login failed';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }
}