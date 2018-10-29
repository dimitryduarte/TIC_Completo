import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { OportunidadesComponent } from './oportunidades/oportunidades.component';
import { CurriculoComponent } from './curriculo/curriculo.component';
import { CurriculoEditComponent } from './curriculo-edit/curriculo-edit.component';
import { VagaComponent } from './vaga/vaga.component';
import { VagaEditComponent } from './vaga-edit/vaga-edit.component';
import { EmpresaEditComponent } from './empresa-edit/empresa-edit.component';
import { CandidatosComponent } from './candidatos/candidatos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    OportunidadesComponent,
    CurriculoComponent,
    CurriculoEditComponent,
    VagaComponent,
    VagaEditComponent,
    EmpresaEditComponent,
    CandidatosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
