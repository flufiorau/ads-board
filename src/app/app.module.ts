import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {AdsComponent} from './ads/ads.component';
import {AdsModule} from './ads/ads.module';
import {NavBarComponent} from './ads/shared/nav-bar/nav-bar.component';
import {AuthComponent} from './core/auth/auth.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './core/material/material.module';
import {AdComponent} from './ads/ad/ad.component';
import {AdListComponent} from './ads/ad-list/ad-list.component';
import {AdEditComponent} from './ads/ad-edit/ad-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AuthComponent,
    AdsComponent,
    AdComponent,
    AdListComponent,
    AdEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AdsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
