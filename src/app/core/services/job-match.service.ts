import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

export interface JobMatchRequest {
  resumeId: string;
  jobDescription: string;
}

export interface JobMatchResult {
  id: string;
  matchScore: number;
  createdAt: string;
  resumeId: string;
  jobTitle: string;
  company?: string;
  matchedSkills: string[];
  missingSkills: string[];
  recommendations: {
    category: string;
    items: string[];
  }[];
  strengthAreas: {
    area: string;
    score: number;
    feedback: string;
  }[];
  improvementAreas: {
    area: string;
    priority: 'high' | 'medium' | 'low';
    suggestions: string[];
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class JobMatchService {
  private readonly API_URL = `${environment.apiUrl}/${environment.apiVersion}/job-match`;

  constructor(private http: HttpClient) {}

  analyzeJobMatch(request: JobMatchRequest): Observable<JobMatchResult> {
    return this.http.post<JobMatchResult>(`${this.API_URL}/analyze`, request);
  }

  getMatchHistory(): Observable<JobMatchResult[]> {
    return this.http.get<JobMatchResult[]>(`${this.API_URL}/history`);
  }

  getMatchById(matchId: string): Observable<JobMatchResult> {
    return this.http.get<JobMatchResult>(`${this.API_URL}/${matchId}`);
  }

  deleteMatch(matchId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API_URL}/${matchId}`);
  }
}
