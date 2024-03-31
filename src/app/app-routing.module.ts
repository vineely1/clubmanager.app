import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { GridComponent } from './components/grid/grid.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { ContentComponent } from './main/content/content.component';
import { MainComponent } from './main/main.component';
import { ClubComponent } from './main/club/club.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: mapToCanActivate([AuthGuard]),
    children: [
      {
        path: '',
        component: ContentComponent,
      },
      {
        path: 'club',
        component: ClubComponent,
        canActivate: mapToCanActivate([AuthGuard]),
      },
      {
        path: 'equipment',
        component: GridComponent,
        canActivate: mapToCanActivate([AuthGuard]),
      },
    ],
  },
  { path: '**', redirectTo: 'main' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
