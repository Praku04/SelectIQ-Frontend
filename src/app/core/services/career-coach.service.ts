import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export interface SendMessageRequest {
  sessionId?: string;
  message: string;
  context?: {
    resumeId?: string;
    jobMatchId?: string;
  };
}

export interface SendMessageResponse {
  sessionId: string;
  message: ChatMessage;
}

@Injectable({
  providedIn: 'root'
})
export class CareerCoachService {
  private readonly API_URL = `${environment.apiUrl}/${environment.apiVersion}/career-coach`;

  constructor(private http: HttpClient) {}

  sendMessage(request: SendMessageRequest): Observable<SendMessageResponse> {
    return this.http.post<SendMessageResponse>(`${this.API_URL}/chat`, request);
  }

  getSession(sessionId: string): Observable<ChatSession> {
    return this.http.get<ChatSession>(`${this.API_URL}/session/${sessionId}`);
  }

  getSessions(): Observable<ChatSession[]> {
    return this.http.get<ChatSession[]>(`${this.API_URL}/sessions`);
  }

  deleteSession(sessionId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API_URL}/session/${sessionId}`);
  }

  clearHistory(): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API_URL}/sessions`);
  }
}
