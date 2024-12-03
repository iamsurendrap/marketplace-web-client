// image-upload.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
  @Input() images: File[] = [];
  @Output() submitImages = new EventEmitter<File[]>();

  constructor(private sanitizer: DomSanitizer) {}

  onFileSelect(event: any) {
    if (event.files) {
      this.images = [...this.images, ...event.files];
    }
  }

  removeImage(index: number) {
    this.images = this.images.filter((_, i) => i !== index);
  }

  getSafeUrl(file: File): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  }

  onSubmit() {
    this.submitImages.emit(this.images);
  }
}