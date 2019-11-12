import { MonitoropComponent } from './monitorop/monitorop.component';
import { PrincipalComponent } from './principal/principal.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '',          component: LoginComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'monitor' ,  component: MonitoropComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
