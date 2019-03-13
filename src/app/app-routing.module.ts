import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {AdEditComponent} from './ads/ad-edit/ad-edit.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'edit', component: AdEditComponent},
  {path: 'edit/:id', component: AdEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
