import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdEditComponent} from './ads/ad-edit/ad-edit.component';
import {AdsComponent} from './ads/ads.component';
import {AdShowComponent} from './ads/ad-show/ad-show.component';

const routes: Routes = [
  {
    path: '', children: [
      {path: '', component: AdsComponent},
      {path: 'edit', component: AdEditComponent},
      {path: 'edit/:id', component: AdEditComponent},
      {path: ':id', component: AdShowComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
