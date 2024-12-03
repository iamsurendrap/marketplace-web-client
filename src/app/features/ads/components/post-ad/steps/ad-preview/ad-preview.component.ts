// ad-preview.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ad-preview',
  templateUrl: './ad-preview.component.html',
  styleUrls: ['./ad-preview.component.scss']
})
export class AdPreviewComponent {
  @Input() adDetails: { title: string; description: string; category: string } | null = null;
  @Input() images: File[] = [];
  @Output() submitAd = new EventEmitter<void>();

  constructor(private sanitizer: DomSanitizer) {}

  getSafeUrl(file: File): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  }

  onSubmit() {
    this.submitAd.emit();
  }
}