import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
//import component
import { FooterComponent } from './components/footer/footer.component';
import { UserComponent } from './components/user/user.component';
import { FlashComponent } from './components/flash/flash.component';
import { ScoopComponent } from './components/scoop/scoop.component';
import { KeywordComponent } from './components/keyword/keyword.component';
import { DocumentComponent } from './components/document/document.component';
import { AuthComponent } from './components/auth/auth.component';
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';
import { MenuComponent } from './components/menu/menu.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { SouscategorieComponent } from './components/souscategorie/souscategorie.component';
////import service
import { CategorieService } from './services/categorie.service';
import { SousCategorieService } from './services/sousCategorie.service';
import { FlashService } from './services/flash.service';
import { MenuService } from './services/menu.service';
import { ScoopService } from './services/scoop.service';
import { RoleComponent } from './components/role/role.component';
import { FormationService } from './services/formation.service';
import { AgenceService } from './services/agence.service';
import { CentreService } from './services/centre.service';
import { TypePaiementService } from './services/typepaiement.service';
import { TypeMembreService } from './services/typemembre.service';
import { PaiementService } from './services/paiement.service';
import { NewmemberComponent } from './components/newmember/newmember.component';
import { BillComponent } from './components/bill/bill.component';
import { LoginComponent } from './components/login/login.component';
import { ProfilComponent } from './components/profil/profil.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    UserComponent,
    FlashComponent,
    ScoopComponent,
    KeywordComponent,
    DocumentComponent,
    AuthComponent,
    MenuComponent,
    CategorieComponent,
    SouscategorieComponent,
    RoleComponent,
    NewmemberComponent,
    BillComponent,
    LoginComponent,
    ProfilComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [UserService,CategorieService,
              SousCategorieService,FlashService,MenuService,ScoopService,FormationService,AgenceService,CentreService,
              RoleService,TypePaiementService,TypeMembreService,FormationService,PaiementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
