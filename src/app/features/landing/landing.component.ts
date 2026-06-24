import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    NavbarComponent
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  typewriterText = signal('');
  private typewriterPhrases = [
    'AI-Powered Intelligence',
    'Smart Resume Analysis',
    'Perfect Job Matches',
    'Interview Success'
  ];
  private currentPhraseIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;
  private typewriterInterval: any;

  features = [
    {
      icon: 'description',
      title: 'ATS Resume Analysis',
      description: 'Get detailed feedback on your resume with AI-powered ATS scoring and recommendations.',
      image: 'assets/images/resume-analysis.svg'
    },
    {
      icon: 'work',
      title: 'Job Matching',
      description: 'Match your resume against job descriptions and discover missing skills and opportunities.',
      image: 'assets/images/job-match.svg'
    },
    {
      icon: 'psychology',
      title: 'Interview Preparation',
      description: 'Generate custom interview questions based on your resume and target role.',
      image: 'assets/images/interview.svg'
    },
    {
      icon: 'trending_up',
      title: 'Skill Gap Analysis',
      description: 'Identify skill gaps and get personalized learning recommendations.',
      image: 'assets/images/skill-gap.svg'
    },
    {
      icon: 'support_agent',
      title: 'AI Career Coach',
      description: 'Get personalized career advice from our AI-powered career coach.',
      image: 'assets/images/career-coach.svg'
    },
    {
      icon: 'insights',
      title: 'Career Insights',
      description: 'Track your progress and get insights into your career development.',
      image: 'assets/images/insights.svg'
    }
  ];

  testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      company: 'Google',
      image: 'assets/images/avatar-1.svg',
      quote: 'SelectIQ helped me optimize my resume and land interviews at top tech companies!'
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'Amazon',
      image: 'assets/images/avatar-2.svg',
      quote: 'The interview prep feature was invaluable. I felt confident going into every interview.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Data Scientist',
      company: 'Meta',
      image: 'assets/images/avatar-3.svg',
      quote: 'The skill gap analysis helped me focus my learning and advance my career.'
    }
  ];

  stats = [
    { value: '50K+', label: 'Resumes Analyzed' },
    { value: '95%', label: 'Success Rate' },
    { value: '10K+', label: 'Happy Users' },
    { value: '4.9/5', label: 'User Rating' }
  ];

  ngOnInit(): void {
    this.startTypewriter();
  }

  ngOnDestroy(): void {
    if (this.typewriterInterval) {
      clearInterval(this.typewriterInterval);
    }
  }

  private startTypewriter(): void {
    this.typewriterInterval = setInterval(() => {
      const currentPhrase = this.typewriterPhrases[this.currentPhraseIndex];
      
      if (!this.isDeleting) {
        // Typing
        if (this.currentCharIndex < currentPhrase.length) {
          this.typewriterText.set(currentPhrase.substring(0, this.currentCharIndex + 1));
          this.currentCharIndex++;
        } else {
          // Pause at end of phrase
          setTimeout(() => {
            this.isDeleting = true;
          }, 2000);
        }
      } else {
        // Deleting
        if (this.currentCharIndex > 0) {
          this.typewriterText.set(currentPhrase.substring(0, this.currentCharIndex - 1));
          this.currentCharIndex--;
        } else {
          this.isDeleting = false;
          this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.typewriterPhrases.length;
        }
      }
    }, this.isDeleting ? 50 : 100);
  }
}
