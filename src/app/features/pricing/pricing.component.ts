import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: string;
  credits: number;
  popular?: boolean;
  features: string[];
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    NavbarComponent
  ],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  plans = signal<SubscriptionPlan[]>([
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for trying out SelectIQ',
      price: 0,
      interval: 'month',
      credits: 10,
      features: [
        '10 Resume analyses per month',
        '5 Job matches',
        'Basic interview prep',
        'Email support',
        'Community access'
      ]
    },
    {
      id: 'pro',
      name: 'Professional',
      description: 'For serious job seekers',
      price: 29,
      interval: 'month',
      credits: 100,
      popular: true,
      features: [
        '100 Resume analyses per month',
        'Unlimited job matches',
        'Advanced interview prep',
        'AI Career Coach (50 messages)',
        'Skill gap analysis',
        'Priority support',
        'Export reports'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For teams and organizations',
      price: 99,
      interval: 'month',
      credits: -1,
      features: [
        'Unlimited everything',
        'Dedicated account manager',
        'Custom integrations',
        'API access',
        'White-label options',
        'Advanced analytics',
        '24/7 premium support',
        'SLA guarantee'
      ]
    }
  ]);
  loading = signal(false);

  ngOnInit(): void {
    // Plans are already set in the signal above
  }

  selectPlan(planId: string): void {
    // Navigate to checkout or subscription page
    console.log('Selected plan:', planId);
  }
}
