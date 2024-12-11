import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './pipes/truncate.pipe';
import { TimeAgoPipe } from './pipes/timeago.pipe';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [TruncatePipe, TimeAgoPipe, AppHeaderComponent, AuthDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    SidebarModule,
    DialogModule,
    MenuModule,
    InputTextModule,
    ToastModule
],
  exports: [TruncatePipe, TimeAgoPipe, AppHeaderComponent, AuthDialogComponent]
})
export class SharedModule { }
