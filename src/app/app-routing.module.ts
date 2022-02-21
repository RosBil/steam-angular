import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { GamesComponent } from './games/games.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {path: 'games', loadChildren: () => import('./games/games.module').then(m => m.GamesModule)}, 
  {path: 'library', loadChildren: () => import('./library/library.module').then(m => m.LibraryModule), canActivate: [AuthGuard]},
  {path: 'friends', loadChildren: () => import('./friends/friends.module').then(m => m.FriendsModule), canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}, 
  {path: 'login', component: LoginComponent}, 
  {path: '', redirectTo: '/games', pathMatch: 'full'}, 
  {path: '**', component: GamesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}