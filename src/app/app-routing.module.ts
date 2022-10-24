import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListUserComponent } from './list-user/list-user.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'UserList', component: ListUserComponent },
  { path: '', redirectTo: 'home ', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
