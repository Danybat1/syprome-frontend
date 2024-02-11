import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { DocumentComponent } from './components/document/document.component';
import { FlashComponent } from './components/flash/flash.component';
import { KeywordComponent } from './components/keyword/keyword.component';
import { MenuComponent } from './components/menu/menu.component';
import { RoleComponent } from './components/role/role.component';
import { ScoopComponent } from './components/scoop/scoop.component';
import { SouscategorieComponent } from './components/souscategorie/souscategorie.component';
import { UserComponent } from './components/user/user.component';
import { NewmemberComponent } from './components/newmember/newmember.component';
import { BillComponent } from './components/bill/bill.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfilComponent } from './components/profil/profil.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:"auth" ,component: AuthComponent},
  {path:"home" ,component: DashboardComponent},
  {path:"profile" ,component: ProfilComponent},
  {path:"login" ,component: LoginComponent},
  {path:"user" ,component: UserComponent},
  {path:"scoop" ,component: ScoopComponent},
  {path:"flash" ,component: FlashComponent},
  {path:"menu" ,component: MenuComponent},
  {path:"categorie" ,component: CategorieComponent},
  {path:"sous-categorie" ,component: SouscategorieComponent},
  {path:"keyword" ,component: KeywordComponent},
  {path:"doc" ,component: DocumentComponent},
  {path:"role" ,component: RoleComponent},
  {path:"new" ,component: NewmemberComponent},
  {path:"bill" ,component: BillComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
