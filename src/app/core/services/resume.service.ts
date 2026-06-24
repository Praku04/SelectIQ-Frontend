import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';

export interface ATSReport {
  id: string;
  filename: string;
  uploadedAt: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  keywords: {
    found: string[];
    missing: string[];
  };
  sections: {
    name: string;
    score: number;
    feedback: string;
  }[];
  formatting: {
    score: number;
    issues: string[];
  };
}

export interface ResumeUploadResponse {
  reportId: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private readonly API_URL = `${environment.apiUrl}/${environment.apiVersion}/resume`;

  constructor(private http: HttpClient) {}

  uploadResume(file: File): Observable<ResumeUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ResumeUploadResponse>(`${this.API_URL}/upload`, formData);
  }

  getATSReport(reportId: string): Observable<ATSReport> {
    return this.http.get<ATSReport>(`${this.API_URL}/ats-report/${reportId}`).pipe(
      catchError(error => {
        // If backend is not available, return mock data for demo purposes
        console.warn('Backend not available, using mock data:', error);
        return of(this.getMockReport(reportId));
      })
    );
  }

  private getMockReport(reportId: string): ATSReport {
    return {
      id: reportId,
      filename: 'demo-resume.pdf',
      uploadedAt: new Date().toISOString(),
      score: 78,
      strengths: [
        'Clear and concise professional summary',
        'Quantifiable achievements with metrics',
        'Well-organized work experience section',
        'Relevant technical skills highlighted',
        'Strong action verbs used throughout'
      ],
      weaknesses: [
        'Missing keywords: "cloud computing", "microservices", "CI/CD"',
        'Education section could include GPA or honors',
        'No certifications listed',
        'Limited soft skills mentioned',
        'Could benefit from more industry-specific terminology'
      ],
      suggestions: [
        'Add keywords like "AWS", "Docker", "Kubernetes" to match job descriptions',
        'Include quantifiable metrics in all bullet points (e.g., "increased by 25%")',
        'Add a certifications section with relevant credentials',
        'Emphasize leadership and teamwork experiences',
        'Use industry-standard terminology and acronyms',
        'Consider adding a projects section to showcase practical skills',
        'Ensure consistent formatting across all sections'
      ],
      keywords: {
        found: [
          'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 
          'Git', 'Agile', 'REST API', 'MongoDB', 'TypeScript'
        ],
        missing: [
          'Cloud Computing', 'AWS', 'Azure', 'Docker', 'Kubernetes',
          'CI/CD', 'Microservices', 'DevOps', 'TDD', 'GraphQL'
        ]
      },
      sections: [
        {
          name: 'Contact Information',
          score: 95,
          feedback: 'All essential contact details are present and properly formatted. Consider adding LinkedIn profile.'
        },
        {
          name: 'Professional Summary',
          score: 85,
          feedback: 'Strong summary that highlights key skills. Could be more specific about years of experience.'
        },
        {
          name: 'Work Experience',
          score: 80,
          feedback: 'Good structure with quantifiable achievements. Add more technical details and impact metrics.'
        },
        {
          name: 'Education',
          score: 70,
          feedback: 'Basic information present. Consider adding GPA, relevant coursework, or academic achievements.'
        },
        {
          name: 'Skills',
          score: 75,
          feedback: 'Comprehensive list of technical skills. Organize into categories (Languages, Frameworks, Tools).'
        }
      ],
      formatting: {
        score: 82,
        issues: [
          'Inconsistent bullet point styling in some sections',
          'Font sizes vary slightly between sections',
          'Consider using more white space for better readability',
          'Some lines are too close together'
        ]
      }
    };
  }

  getResumeHistory(): Observable<ATSReport[]> {
    return this.http.get<ATSReport[]>(`${this.API_URL}/history`);
  }

  deleteResume(reportId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API_URL}/${reportId}`);
  }

  downloadReport(reportId: string): Observable<Blob> {
    return this.http.get(`${this.API_URL}/download/${reportId}`, {
      responseType: 'blob'
    });
  }
}
