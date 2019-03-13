import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthModule} from './auth/auth.module';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class CoreModule {
}
