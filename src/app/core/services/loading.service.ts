import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private requestCount = 0;
  
  isLoading$ = this.loadingSubject.asObservable();
  isLoading = signal(false);

  show(): void {
    this.requestCount++;
    if (this.requestCount === 1) {
      this.loadingSubject.next(true);
      this.isLoading.set(true);
    }
  }

  hide(): void {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this.loadingSubject.next(false);
      this.isLoading.set(false);
    }
  }

  reset(): void {
    this.requestCount = 0;
    this.loadingSubject.next(false);
    this.isLoading.set(false);
  }
}
