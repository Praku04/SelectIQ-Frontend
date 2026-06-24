import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

export interface InterviewQuestion {
  id: string;
  type: 'technical' | 'behavioral' | 'scenario';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  sampleAnswer?: string;
  tips: string[];
  relatedSkills: string[];
}

export interface InterviewSession {
  id: string;
  createdAt: string;
  jobTitle: string;
  company?: string;
  resumeId?: string;
  questions: InterviewQuestion[];
  completed: boolean;
}

export interface GenerateQuestionsRequest {
  resumeId?: string;
  jobDescription?: string;
  questionTypes: ('technical' | 'behavioral' | 'scenario')[];
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  private readonly API_URL = `${environment.apiUrl}/${environment.apiVersion}/interview`;

  constructor(private http: HttpClient) {}

  generateQuestions(request: GenerateQuestionsRequest): Observable<InterviewSession> {
    return this.http.post<InterviewSession>(`${this.API_URL}/generate`, request);
  }

  getSession(sessionId: string): Observable<InterviewSession> {
    return this.http.get<InterviewSession>(`${this.API_URL}/session/${sessionId}`);
  }

  getSessionHistory(): Observable<InterviewSession[]> {
    return this.http.get<InterviewSession[]>(`${this.API_URL}/history`);
  }

  completeSession(sessionId: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.API_URL}/session/${sessionId}/complete`, {});
  }

  deleteSession(sessionId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API_URL}/session/${sessionId}`);
  }

  exportSession(sessionId: string): Observable<Blob> {
    return this.http.get(`${this.API_URL}/session/${sessionId}/export`, {
      responseType: 'blob'
    });
  }
}
