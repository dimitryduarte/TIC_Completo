import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { MainRoutes, MAIN_ROUTES } from './main/main.routes';
import { LOGIN_ROUTES } from './login/login.routes';

const routes: Routes = [
      ...MAIN_ROUTES,
      ...LOGIN_ROUTES
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
