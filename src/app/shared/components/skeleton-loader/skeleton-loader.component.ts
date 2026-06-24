import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    @switch (type) {
      @case ('card') {
        <div class="card animate-pulse">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
      }
      @case ('list') {
        <div class="space-y-3 animate-pulse">
          @for (item of array(count); track $index) {
            <div class="flex items-center space-x-4">
              <div class="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div class="flex-1 space-y-2">
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          }
        </div>
      }
      @case ('table') {
        <div class="space-y-2 animate-pulse">
          @for (row of array(count); track $index) {
            <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          }
        </div>
      }
      @case ('text') {
        <div class="space-y-2 animate-pulse">
          @for (line of array(count); track $index) {
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded" 
                 [style.width.%]="$index === count - 1 ? 60 : 100"></div>
          }
        </div>
      }
      @default {
        <div class="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      }
    }
  `,
  styles: []
})
export class SkeletonLoaderComponent {
  @Input() type: 'card' | 'list' | 'table' | 'text' | 'custom' = 'card';
  @Input() count: number = 3;

  array(n: number): number[] {
    return Array(n).fill(0);
  }
}
