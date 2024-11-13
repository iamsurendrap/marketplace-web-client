import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PaginatorModule } from 'primeng/paginator';

import { AdsRoutingModule } from './ads-routing.module';
import { AdListComponent } from './components/ad-list/ad-list.component';
import { AdItemComponent } from './components/ad-item/ad-item.component';
import { adReducer } from './store/reducers/ad.reducer';
import { AdEffects } from './store/effects/ad.effects';
import { SharedModule } from '../../shared/shared.module';
import {ScrollTopModule} from 'primeng/scrolltop';


@NgModule({
  declarations: [AdListComponent, AdItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdsRoutingModule,
    StoreModule.forFeature('ads', adReducer),
    EffectsModule.forFeature([AdEffects]),
    VirtualScrollerModule,
    CardModule,
    ButtonModule,
    ProgressSpinnerModule,
    PaginatorModule,
    SkeletonModule,
    MessageModule,
    ScrollTopModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AdsModule { }