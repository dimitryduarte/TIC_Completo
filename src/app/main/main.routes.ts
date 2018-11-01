import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./main.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { OportunidadesComponent } from "./oportunidades/oportunidades.component";
import { CurriculoComponent } from "./curriculo/curriculo.component";
import { VagaComponent } from "./vaga/vaga.component";
import { NgModule } from "@angular/core";
import { EmpresaComponent } from "./empresa/empresa.component";


export const MAIN_ROUTES: Routes = [
    {
        path: '', component: MainComponent, children: [
            { path: 'header', component: HeaderComponent },
            { path: 'footer', component: FooterComponent },
            { path: 'home', component: HomeComponent },
            { path: 'oportunidades', component: OportunidadesComponent },
            { path: 'curriculo', component: CurriculoComponent },
            { path: 'vaga', component: VagaComponent },
            { path: 'empresa', component: EmpresaComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(MAIN_ROUTES)],
    exports: [RouterModule]
})
export class MainRoutes { }
