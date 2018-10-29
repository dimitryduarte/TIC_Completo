import {Routes} from '@angular/router'
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OportunidadesComponent } from './oportunidades/oportunidades.component';

export const ROUTES: Routes = [
    {path: 'header', component: HeaderComponent},
    {path: 'footer', component: FooterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'oportunidades', component: OportunidadesComponent},
    {path: '', component: HomeComponent}

] 