import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OportunidadesComponent } from './oportunidades/oportunidades.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { CurriculoComponent } from './curriculo/curriculo.component';

const routes: Routes = [
                          {path: 'header', component: HeaderComponent},
                          {path: 'footer', component: FooterComponent},
                          {path: 'home', component: HomeComponent},
                          {path: 'login', component: LoginComponent},
                          {path: 'oportunidades', component: OportunidadesComponent},
                          {path: 'curriculo', component: CurriculoComponent},                          
                          {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
