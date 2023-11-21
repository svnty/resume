import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { CanActivateApp } from './canActivateApp';
import { HomeComponent } from './home/home';
import { VideoComponent } from './video/video';
import { canViewLogin } from './canViewLogin';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [canViewLogin] },
  { path: 'home', component: HomeComponent, canActivate: [CanActivateApp] },
  { path: 'video/:id', component: VideoComponent, canActivate: [CanActivateApp] },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
