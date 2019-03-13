import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule, MatInputModule, MatToolbarModule} from '@angular/material';

export const MATERIAL_MODULES = [
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatToolbarModule
];

@NgModule({
  imports: [
    MATERIAL_MODULES
  ],
  exports: [
    MATERIAL_MODULES
  ]
})
export class MaterialModule {
}
