import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { CandidatosModule } from './candidatos/candidatos.module';
import { CurriculoModule } from './curriculo/curriculo.module';
import { EmpresaModule } from './empresa/empresa.module';
import { HomeModule } from './home/home.module';
import { OportunidadesModule } from './oportunidades/oportunidades.module';
import { VagaModule } from './vaga/vaga.module';
import { MainRoutes } from './main.routes';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

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
