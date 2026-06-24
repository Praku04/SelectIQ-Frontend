import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center" [class]="containerClass">
      <!-- Logo Icon -->
      <div class="relative" [style.width.px]="size" [style.height.px]="size">
        <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Head Profile -->
          <path d="M140 60 C140 35, 120 20, 95 20 C70 20, 50 35, 50 60 L50 100 C50 125, 60 140, 75 150 L75 180 L115 180 L115 150 C130 140, 140 125, 140 100 Z" 
                fill="#0087ba" stroke="#00445d" stroke-width="3"/>
          
          <!-- Brain/Network circles -->
          <circle cx="80" cy="55" r="6" fill="#00A8E8"/>
          <circle cx="95" cy="45" r="6" fill="#00A8E8"/>
          <circle cx="110" cy="55" r="6" fill="#00A8E8"/>
          <circle cx="87" cy="70" r="6" fill="#00A8E8"/>
          <circle cx="103" cy="70" r="6" fill="#00A8E8"/>
          
          <!-- Connection lines -->
          <line x1="80" y1="55" x2="95" y2="45" stroke="#00A8E8" stroke-width="2"/>
          <line x1="95" y1="45" x2="110" y2="55" stroke="#00A8E8" stroke-width="2"/>
          <line x1="80" y1="55" x2="87" y2="70" stroke="#00A8E8" stroke-width="2"/>
          <line x1="110" y1="55" x2="103" y2="70" stroke="#00A8E8" stroke-width="2"/>
          <line x1="87" y1="70" x2="103" y2="70" stroke="#00A8E8" stroke-width="2"/>
          
          <!-- Lightbulb -->
          <circle cx="95" cy="80" r="15" fill="#FFC107" stroke="#FF6B35" stroke-width="2"/>
          <path d="M90 95 L90 105 L100 105 L100 95" fill="#FF6B35"/>
          <rect x="88" y="105" width="14" height="3" fill="#FF9800"/>
          
          <!-- Checkmark/Swoosh -->
          <path d="M55 160 C65 155, 80 150, 95 155 C110 160, 125 165, 135 170" 
                stroke="#FF6B35" stroke-width="6" fill="none" stroke-linecap="round"/>
        </svg>
      </div>
      
      <!-- Logo Text -->
      @if (showText) {
        <div class="ml-3 flex items-baseline">
          <span class="font-bold" [class]="textClass" style="color: #00A8E8;">Select</span>
          <span class="font-bold" [class]="textClass" style="color: #FF6B35;">IQ</span>
        </div>
      }
    </div>
  `,
  styles: []
})
export class LogoComponent {
  @Input() size: number = 40;
  @Input() showText: boolean = true;
  @Input() textClass: string = 'text-2xl';
  @Input() containerClass: string = '';
}
