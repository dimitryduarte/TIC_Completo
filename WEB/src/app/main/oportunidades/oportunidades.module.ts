import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OportunidadesComponent } from './oportunidades.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [OportunidadesComponent]
})
export class OportunidadesModule { }
