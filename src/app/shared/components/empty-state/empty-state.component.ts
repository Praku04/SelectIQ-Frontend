import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div class="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
        <mat-icon class="!w-12 !h-12 !text-5xl text-gray-400">{{ icon }}</mat-icon>
      </div>
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {{ title }}
      </h3>
      <p class="text-gray-600 dark:text-gray-400 max-w-md mb-6">
        {{ description }}
      </p>
      @if (actionLabel) {
        <button mat-raised-button color="primary" (click)="onAction()">
          {{ actionLabel }}
        </button>
      }
    </div>
  `,
  styles: []
})
export class EmptyStateComponent {
  @Input() icon: string = 'inbox';
  @Input() title: string = 'No data found';
  @Input() description: string = 'Get started by adding your first item.';
  @Input() actionLabel?: string;
  @Output() action = new EventEmitter<void>();

  onAction(): void {
    this.action.emit();
  }
}
