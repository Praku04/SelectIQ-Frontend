import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  credits: number;
  popular?: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  plan: SubscriptionPlan;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  creditsRemaining: number;
  creditsUsed: number;
}

export interface CreateSubscriptionRequest {
  planId: string;
  paymentMethodId: string;
}

export interface UsageStats {
  resumeAnalyses: number;
  jobMatches: number;
  interviewSessions: number;
  careerCoachMessages: number;
  totalCreditsUsed: number;
  period: {
    start: string;
    end: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private readonly API_URL = `${environment.apiUrl}/${environment.apiVersion}/subscription`;

  constructor(private http: HttpClient) {}

  getPlans(): Observable<SubscriptionPlan[]> {
    return this.http.get<SubscriptionPlan[]>(`${this.API_URL}/plans`);
  }

  getCurrentSubscription(): Observable<Subscription> {
    return this.http.get<Subscription>(`${this.API_URL}/current`);
  }

  createSubscription(request: CreateSubscriptionRequest): Observable<Subscription> {
    return this.http.post<Subscription>(`${this.API_URL}/subscribe`, request);
  }

  cancelSubscription(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.API_URL}/cancel`, {});
  }

  resumeSubscription(): Observable<Subscription> {
    return this.http.post<Subscription>(`${this.API_URL}/resume`, {});
  }

  updateSubscription(planId: string): Observable<Subscription> {
    return this.http.put<Subscription>(`${this.API_URL}/update`, { planId });
  }

  getUsageStats(): Observable<UsageStats> {
    return this.http.get<UsageStats>(`${this.API_URL}/usage`);
  }

  createCheckoutSession(planId: string): Observable<{ sessionId: string; url: string }> {
    return this.http.post<{ sessionId: string; url: string }>(`${this.API_URL}/checkout`, { planId });
  }

  createPortalSession(): Observable<{ url: string }> {
    return this.http.post<{ url: string }>(`${this.API_URL}/portal`, {});
  }
}
