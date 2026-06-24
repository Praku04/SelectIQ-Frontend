import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';

@Component({
  selector: 'app-skill-gap',
  standalone: true,
  imports: [CommonModule, MatCardModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="container-custom py-8">
      <h1 class="text-3xl font-bold mb-6">Skill Gap Analysis</h1>
      <mat-card>
        <mat-card-content>
          <p>Skill gap analysis - Skills matrix, gap visualization, learning recommendations</p>
          <p class="text-sm text-gray-500 mt-4">TODO: Implement skill gap analysis</p>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class SkillGapComponent {}
