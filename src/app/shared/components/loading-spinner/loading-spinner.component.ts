import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="flex items-center justify-center" [style.height.px]="height">
      <div class="text-center">
        <mat-spinner [diameter]="size" [color]="color"></mat-spinner>
        @if (message) {
          <p class="mt-4 text-gray-600 dark:text-gray-400">{{ message }}</p>
        }
      </div>
    </div>
  `,
  styles: []
})
export class LoadingSpinnerComponent {
  @Input() size: number = 50;
  @Input() height: number = 300;
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() message?: string;
}
