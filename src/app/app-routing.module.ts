import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';

import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { FloorComponent } from './floor/floor.component';
import { DeskComponent } from './desk/desk.component';
import { FloorListComponent } from './masters/floor-list/floor-list.component';
import { FloorAddComponent } from './masters/floor-add/floor-add.component';
import { DeskListComponent } from './masters/desk-list/desk-list.component';
import { DeskAddComponent } from './masters/desk-add/desk-add.component';
import { ChairListComponent } from './masters/chair-list/chair-list.component';
import { ChairAddComponent } from './masters/chair-add/chair-add.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'floor', component: FloorComponent, canActivate: [AuthGuard] },
  { path: 'floor/desk/:id', component: DeskComponent, canActivate: [AuthGuard] },
  { path: 'master/floor/list', component: FloorListComponent, canActivate: [AuthGuard] },
  { path: 'master/desk/list/:id', component: DeskListComponent, canActivate: [AuthGuard] },
  { path: 'master/chair/list/:floorId/:deskId', component: ChairListComponent, canActivate: [AuthGuard] },
  { path: 'master/floor/add', component: FloorAddComponent, canActivate: [AuthGuard] },
  { path: 'master/desk/add/:id', component: DeskAddComponent, canActivate: [AuthGuard] },
  { path: 'master/chair/add/:floorId/:deskId', component: ChairAddComponent, canActivate: [AuthGuard] },
  { path: 'users/add', component: UserAddComponent, canActivate: [AuthGuard] },
  { path: 'users/detail/:id', component: UserDetailComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
