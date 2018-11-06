import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VagaComponent } from './vaga.component';
import { RouterModule } from '@angular/router';
import { VagaEditComponent } from './vaga-edit/vaga-edit.component';
import { VagaEditModule } from './vaga-edit/vaga-edit.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    VagaEditModule
  ],
  declarations: [VagaComponent]
})
export class VagaModule { }


/*

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MainRoutes,
    CandidatosModule,
    CurriculoModule,
    EmpresaModule,
    HomeModule,
    OportunidadesModule,
    VagaModule
  ],
  declarations: [MainComponent,
                  HeaderComponent,
                FooterComponent]
})
export class MainModule { }

*/