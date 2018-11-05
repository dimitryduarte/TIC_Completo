import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurriculoComponent } from './curriculo.component';
import { CurriculoEditModule } from './curriculo-edit/curriculo-edit.module';

@NgModule({
  imports: [
    CommonModule,
    CurriculoEditModule
  ],
  declarations: [CurriculoComponent]
})
export class CurriculoModule { }
