import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {AdComponent} from './ads/ad/ad.component';
import {AdListComponent} from './ads/ad-list/ad-list.component';
import {AdEditComponent} from './ads/ad-edit/ad-edit.component';
import {AdsComponent} from './ads/ads/ads.component';
import {NavBarComponent} from './ads/shared/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    AdComponent,
    AdListComponent,
    AdEditComponent,
    AdsComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
