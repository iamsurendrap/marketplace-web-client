import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, StoreModule } from '@ngrx/store';
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
import { ScrollTopModule } from 'primeng/scrolltop';
import { StepperModule } from 'primeng/stepper';
import { PostAdComponent } from './components/post-ad/post-ad.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { AdPreviewComponent } from './components/post-ad/steps/ad-preview/ad-preview.component';
import { ImageUploadComponent } from './components/post-ad/steps/image-upload/image-upload.component';
import { AdDetailsFormComponent } from './components/post-ad/steps/ad-details-form/ad-details-form.component';
import { FileUploadModule } from 'primeng/fileupload';
import { CarouselModule } from 'primeng/carousel';
import { StepsModule } from 'primeng/steps';
import { AdsContainerComponent } from './ads-container/ads-container.component';
import { listingReducer } from 'src/app/store/post-ad/post-ad.reducer';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { GalleriaModule } from 'primeng/galleria';
import { ListingEffects } from 'src/app/store/post-ad/post-ad.effects';
import { adItemReducer } from './store/reducers/ad-item.reducer';
import { AdItemEffects } from './store/effects/ad-item.effects';
import { ViewAdComponent } from './components/view-ad/view-ad.component';
import { EditAdComponent } from './components/edit-ad/edit-ad.component';

@NgModule({
  declarations: [AdListComponent, ViewAdComponent, AdItemComponent,AdsContainerComponent, PostAdComponent,
    AdPreviewComponent, ImageUploadComponent,AdDetailsFormComponent, EditAdComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AdsRoutingModule,
    StoreModule.forFeature('ads', adReducer),
    StoreModule.forFeature('viewAd', adItemReducer),
    StoreModule.forFeature('listing', listingReducer),
    EffectsModule.forFeature([AdEffects, ListingEffects, AdItemEffects]),
    VirtualScrollerModule,
    CardModule,
    ButtonModule,
    DropdownModule,
    ProgressSpinnerModule,
    InputTextareaModule,
    PaginatorModule,
    SkeletonModule,
    MessageModule,
    ScrollTopModule,
    StepsModule,
    StepperModule,
    FileUploadModule,
    CarouselModule,
    GalleriaModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AdsModule { }
