import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdListComponent } from './components/ad-list/ad-list.component';

const routes: Routes = [
  { path: '', component: AdListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdsRoutingModule { }