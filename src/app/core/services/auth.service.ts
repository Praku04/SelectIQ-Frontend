import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, catchError, of } from 'rxjs';
import { environment } from '@environments/environment';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  subscription?: {
    plan: string;
    status: string;
    credits: number;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/${environment.apiVersion}`;
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  currentUser$ = this.currentUserSubject.asObservable();
  currentUser = signal<User | null>(this.getUserFromStorage());
  isAuthenticated = signal<boolean>(!!this.getToken());

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/login`, credentials).pipe(
      tap(response => this.handleAuthSuccess(response))
    );
  }

  register(data: RegisterData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/register`, data).pipe(
      tap(response => this.handleAuthSuccess(response))
    );
  }

  loginWithGoogle(token: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/google`, { token }).pipe(
      tap(response => this.handleAuthSuccess(response))
    );
  }

  logout(): void {
    this.clearAuthData();
    this.currentUserSubject.next(null);
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/auth/login']);
  }

  refreshToken(): Observable<{ access_token: string }> {
    const refreshToken = this.getRefreshToken();
    return this.http.post<{ access_token: string }>(`${this.API_URL}/auth/refresh`, { refresh_token: refreshToken }).pipe(
      tap(response => {
        this.setToken(response.access_token);
      }),
      catchError(() => {
        this.logout();
        return of({ access_token: '' });
      })
    );
  }

  forgotPassword(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.API_URL}/auth/forgot-password`, { email });
  }

  resetPassword(token: string, password: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.API_URL}/auth/reset-password`, { token, password });
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/auth/me`).pipe(
      tap(user => {
        this.currentUserSubject.next(user);
        this.currentUser.set(user);
        this.saveUser(user);
      })
    );
  }

  private handleAuthSuccess(response: AuthResponse): void {
    this.setToken(response.access_token);
    this.setRefreshToken(response.refresh_token);
    this.saveUser(response.user);
    this.currentUserSubject.next(response.user);
    this.currentUser.set(response.user);
    this.isAuthenticated.set(true);
  }

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  private setToken(token: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
  }

  private getRefreshToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('refresh_token');
    }
    return null;
  }

  private setRefreshToken(token: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('refresh_token', token);
    }
  }

  private saveUser(user: User): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  private getUserFromStorage(): User | null {
    if (typeof localStorage !== 'undefined') {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }

  private clearAuthData(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }
}
