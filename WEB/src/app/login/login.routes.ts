import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";


export const LOGIN_ROUTES: Routes = [
    {
        path: 'login', component: LoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(LOGIN_ROUTES)],
    exports: [RouterModule]
})
export class MainRoutes { }
