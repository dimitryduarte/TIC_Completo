import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaComponent } from './empresa.component';
import { EmpresaEditModule } from './empresa-edit/empresa-edit.module';

@NgModule({
  imports: [
    CommonModule,
    EmpresaEditModule
  ],
  declarations: [EmpresaComponent]
})
export class EmpresaModule { }
