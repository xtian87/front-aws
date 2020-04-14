import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { GuardaService } from './_services/guarda.service';
import { BodyComponent } from './pages/body/body.component';
import { SurveryComponent } from './pages/survery/survery.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent, canActivate: [GuardaService]},
    {path: 'app', component: BodyComponent, children: [
      {path: 'survery', component: SurveryComponent}
    ], canActivate: [GuardaService]},
    /*{path: 'logout', component: LogoutComponent},
    {path: 'security', component: SecurityComponent},
    {path: 'app', component: BodyComponent, children: [
      {path: 'mapa', component: MapaComponent},
      {path: 'about', component: AboutComponent},
      {path: 'problema', component: ProblemaComponent},
      {path: 'admin', component: AdminComponent, children: [
        {path: 'tiponegocio', component: TiponegocioComponent},
        {path: 'negocio', component: NegocioComponent},
        {path: 'sedes', component: SedesComponent}
     ]},
    ], canActivate: [GuardService]},*/
    {path: '**', redirectTo: 'login', pathMatch: 'full'}
  ];
  
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }