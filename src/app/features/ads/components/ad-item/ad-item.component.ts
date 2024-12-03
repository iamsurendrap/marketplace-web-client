
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Ad } from '../../models/ad.model';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ad-item',
  templateUrl: './ad-item.component.html',
  styleUrls: ['./ad-item.component.scss']
})

export class AdItemComponent {
  @Input() ad: any;
  @Output() cardClick = new EventEmitter<any>();
  @Output() heartClick = new EventEmitter<any>();

  constructor(private router: Router){}

  onCardClick(adId: string) {
    this.router.navigate(['/view-ad', adId]);
  }

  onHeartClick(event: Event) {
    event.stopPropagation();
    this.heartClick.emit(this.ad);
  }
}
