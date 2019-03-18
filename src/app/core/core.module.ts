import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthModule} from './auth/auth.module';
import {AuthService} from './auth/auth.service';
import {MaterialModule} from './material/material.module';

@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    MaterialModule
  ],
  providers: [
    AuthService
  ]
})
export class CoreModule {
}
