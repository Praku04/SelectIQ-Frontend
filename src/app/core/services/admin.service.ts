import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { User } from './auth.service';

export interface AdminStats {
  totalUsers: number;
  activeSubscriptions: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalAICost: number;
  monthlyAICost: number;
  profitMargin: number;
}

export interface UserManagement extends User {
  createdAt: string;
  lastLogin: string;
  subscriptionStatus: string;
  totalSpent: number;
}

export interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  uptime: number;
  apiLatency: number;
  databaseStatus: string;
  redisStatus: string;
  queueStatus: string;
  errorRate: number;
}

export interface UsageAnalytics {
  date: string;
  resumeAnalyses: number;
  jobMatches: number;
  interviewSessions: number;
  careerCoachMessages: number;
  newUsers: number;
  activeUsers: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly API_URL = `${environment.apiUrl}/${environment.apiVersion}/admin`;

  constructor(private http: HttpClient) {}

  getStats(): Observable<AdminStats> {
    return this.http.get<AdminStats>(`${this.API_URL}/stats`);
  }

  getUsers(page: number = 1, limit: number = 20): Observable<{ users: UserManagement[]; total: number }> {
    return this.http.get<{ users: UserManagement[]; total: number }>(`${this.API_URL}/users`, {
      params: { page: page.toString(), limit: limit.toString() }
    });
  }

  getUser(userId: string): Observable<UserManagement> {
    return this.http.get<UserManagement>(`${this.API_URL}/users/${userId}`);
  }

  updateUser(userId: string, data: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/users/${userId}`, data);
  }

  deleteUser(userId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API_URL}/users/${userId}`);
  }

  getSystemHealth(): Observable<SystemHealth> {
    return this.http.get<SystemHealth>(`${this.API_URL}/health`);
  }

  getUsageAnalytics(startDate: string, endDate: string): Observable<UsageAnalytics[]> {
    return this.http.get<UsageAnalytics[]>(`${this.API_URL}/analytics`, {
      params: { startDate, endDate }
    });
  }

  getRevenueReport(startDate: string, endDate: string): Observable<any> {
    return this.http.get(`${this.API_URL}/revenue`, {
      params: { startDate, endDate }
    });
  }
}
