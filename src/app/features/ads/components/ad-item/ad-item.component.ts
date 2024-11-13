
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Ad } from '../../models/ad.model';

@Component({
  selector: 'app-ad-item',
  templateUrl: './ad-item.component.html',
  styleUrls: ['./ad-item.component.scss']
})

export class AdItemComponent {
  @Input() ad: any;
  @Output() cardClick = new EventEmitter<any>();
  @Output() heartClick = new EventEmitter<any>();

  onCardClick() {
    this.cardClick.emit(this.ad);
  }

  onHeartClick(event: Event) {
    event.stopPropagation();
    this.heartClick.emit(this.ad);
  }
}