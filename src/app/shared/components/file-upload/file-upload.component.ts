import { Component, Output, EventEmitter, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressBarModule],
  template: `
    <div 
      class="border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-200"
      [class.border-primary-500]="isDragging()"
      [class.bg-primary-50]="isDragging()"
      [class.dark:bg-primary-900]="isDragging()"
      [class.border-gray-300]="!isDragging()"
      [class.dark:border-gray-700]="!isDragging()"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave($event)"
      (drop)="onDrop($event)">
      
      @if (!selectedFile()) {
        <mat-icon class="!w-16 !h-16 !text-6xl text-gray-400 mb-4">cloud_upload</mat-icon>
        <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">{{ description }}</p>
        <input 
          #fileInput
          type="file" 
          class="hidden" 
          [accept]="accept"
          (change)="onFileSelected($event)">
        <button mat-raised-button color="primary" (click)="fileInput.click()">
          Choose File
        </button>
        @if (accept) {
          <p class="text-sm text-gray-500 mt-2">Accepted: {{ accept }}</p>
        }
      } @else {
        <div class="space-y-4">
          <div class="flex items-center justify-center space-x-3">
            <mat-icon class="text-green-500">check_circle</mat-icon>
            <span class="font-medium">{{ selectedFile()?.name }}</span>
            <button mat-icon-button (click)="removeFile()" color="warn">
              <mat-icon>close</mat-icon>
            </button>
          </div>
          @if (uploading()) {
            <div>
              <mat-progress-bar mode="determinate" [value]="uploadProgress()"></mat-progress-bar>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Uploading... {{ uploadProgress() }}%
              </p>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: []
})
export class FileUploadComponent {
  @Input() title: string = 'Upload your file';
  @Input() description: string = 'Drag and drop or click to browse';
  @Input() accept: string = '';
  @Input() maxSizeMB: number = 10;
  
  @Output() fileSelected = new EventEmitter<File>();
  
  selectedFile = signal<File | null>(null);
  isDragging = signal(false);
  uploading = signal(false);
  uploadProgress = signal(0);

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  private handleFile(file: File): void {
    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > this.maxSizeMB) {
      alert(`File size exceeds ${this.maxSizeMB}MB limit`);
      return;
    }

    this.selectedFile.set(file);
    this.fileSelected.emit(file);
  }

  removeFile(): void {
    this.selectedFile.set(null);
    this.uploadProgress.set(0);
    this.uploading.set(false);
  }

  setUploading(uploading: boolean): void {
    this.uploading.set(uploading);
  }

  setProgress(progress: number): void {
    this.uploadProgress.set(progress);
  }
}
