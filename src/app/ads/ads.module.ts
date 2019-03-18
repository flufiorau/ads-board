import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdsService} from './ads.service';
import {MaterialModule} from '../core/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [
    AdsService
  ],
})
export class AdsModule {
}
