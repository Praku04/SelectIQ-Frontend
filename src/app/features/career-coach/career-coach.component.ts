import { Component, OnInit, signal, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { CareerCoachService, ChatMessage } from '@core/services/career-coach.service';

@Component({
  selector: 'app-career-coach',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NavbarComponent
  ],
  templateUrl: './career-coach.component.html',
  styleUrls: ['./career-coach.component.scss']
})
export class CareerCoachComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  
  messages = signal<ChatMessage[]>([]);
  userMessage = '';
  loading = signal(false);
  typing = signal(false);
  sessionId = signal<string | undefined>(undefined);

  constructor(private careerCoachService: CareerCoachService) {}

  ngOnInit(): void {
    this.loadSessions();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  loadSessions(): void {
    this.careerCoachService.getSessions().subscribe({
      next: (sessions) => {
        if (sessions.length > 0) {
          this.sessionId.set(sessions[0].id);
          this.messages.set(sessions[0].messages);
        }
      },
      error: (error) => {
        console.error('Failed to load sessions:', error);
      }
    });
  }

  sendMessage(): void {
    if (!this.userMessage.trim() || this.loading()) return;

    const message = this.userMessage.trim();
    this.userMessage = '';

    // Add user message immediately
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    this.messages.update(msgs => [...msgs, userMsg]);

    this.loading.set(true);
    this.typing.set(true);

    this.careerCoachService.sendMessage({
      sessionId: this.sessionId(),
      message
    }).subscribe({
      next: (response) => {
        this.sessionId.set(response.sessionId);
        this.messages.update(msgs => [...msgs, response.message]);
        this.loading.set(false);
        this.typing.set(false);
      },
      error: (error) => {
        console.error('Failed to send message:', error);
        this.loading.set(false);
        this.typing.set(false);
      }
    });
  }

  clearHistory(): void {
    if (confirm('Are you sure you want to clear the chat history?')) {
      this.careerCoachService.clearHistory().subscribe({
        next: () => {
          this.messages.set([]);
          this.sessionId.set(undefined);
        },
        error: (error) => {
          console.error('Failed to clear history:', error);
        }
      });
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = 
          this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }
}
