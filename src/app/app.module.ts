import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { categoryReducer } from './store/category/category.reducer';
import { CategoryEffects } from './store/category/category.effects';
import { SharedModule } from './shared/shared.module';
import { authReducer } from './store/authentication/auth.reducer';
import { AuthEffects } from './store/authentication/auth.effects';
import { AuthDialogEffects } from './shared/components/auth-dialog/auth-dialog.effects';
import { keyValueReducer } from './store/globalvariables/key-value.reducer';
import { listingReducer } from './store/post-ad/post-ad.reducer';
import { ListingEffects } from './store/post-ad/post-ad.effects';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({ category: categoryReducer, auth: authReducer, listing: listingReducer, keyValue : keyValueReducer }),
    EffectsModule.forRoot([ CategoryEffects, AuthEffects, AuthDialogEffects, ListingEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false
    })
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
