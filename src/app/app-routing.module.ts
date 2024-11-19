import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./views/auth-layout/auth-layout.module').then((m) =>m.AuthLayoutModule)
  },
  {
    path: '',
    loadChildren: () => import('./views/app-layout/app-layout.module').then((m) => m.AppLayoutModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
