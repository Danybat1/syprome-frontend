import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Menu } from 'src/app/models/Menu.model';
import { User } from 'src/app/models/User.model';
import { FlashService } from 'src/app/services/flash.service';
import { MenuService } from 'src/app/services/menu.service';
import { HttpBodyResponse } from 'src/app/utilities/HttpBodyResponse';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newmember',
  templateUrl: './newmember.component.html',
  styleUrls: ['./newmember.component.css']
})
export class NewmemberComponent implements OnInit {

  menus:any=[];
  menu:Menu=new Menu;
  flashs: any=[];
  id: number =0;
  file1: any|null=null;
  menuSubscription: Subscription = new Subscription;
  flashSubscription : Subscription = new Subscription;

  selectFile(data: any) {
  
    this.file1=data.files;
    console.log("on changed ok");
     
  }
  constructor(private menuService:MenuService ,private flashService: FlashService) { }

  ngOnInit(): void {
    const that= this;
    this.menuSubscription=this.menuService.list().subscribe({
      next(bodyResponse: HttpBodyResponse) {
        if(bodyResponse.status==="Success"){
         that.menus=bodyResponse.response;
         console.log(bodyResponse.response);
        }
      },
      error(err) {
        console.log(err);
      },
    });
    this.flashs =  this.flashService.list().subscribe({
      next(bodyResponse: HttpBodyResponse) {
        if(bodyResponse.status==="Success"){
         that.flashs=bodyResponse.response;
        }
         
      },
      error(err) {
        console.log(err);
      },
    })
  }

  getMenu (id:number) {
    const that= this;
    this.id=id;

    this.menuSubscription= this.menuService.getItem(id).subscribe({
      next(bodyResponse: HttpBodyResponse) {
        if(bodyResponse.status==="Success"){
          that.menu=bodyResponse.response;
          console.log(that.menu);
         }
      },
      error(err) {
        console.log(err);
      },
    });

  }
  getId(id:number) {
    id=this.id;
  }
  delete() {
    this.menuService.delete(this.id).subscribe(
      {
       next (bodyResponse: HttpBodyResponse) {
          if(bodyResponse.status==="Success"){
          console.log("data delete");
           }

        },
        error(err) {
          console.log(err)
        },
      }
    );
  }

  onSubmit(form: NgForm) {

    var formData: any = new FormData();
   var  nom =form.value['nom'];
   var  postnom =form.value['postnom'];
   var  prenom =form.value['prenom'];
   var  genre =form.value['genre'];
   var  lieu =form.value['lieu'];
   var  naissance =form.value['naissance'];
   var  etat =form.value['etat'];
   var  telephone =form.value['telephone'];
   var  profesion =form.value['profesion'];
   var  adresse =form.value['adresse'];
   var  employeur =form.value['employeur'];
   var  telEmployeur =form.value['telEmployeur'];
   var  salaire =form.value['salaire'];
   var  AdrEmployeur =form.value['AdrEmployeur'];
   var  soins =form.value['soins'];
   var  frais =form.value['frais'];
   if(this.file1!=null){
    formData.append('photo', this.file1[0]);
  }
  formData.append('nom', nom);formData.append('postnom', postnom);formData.append('prenom', prenom);formData.append('genre', genre);formData.append('lieu', lieu);formData.append('dateNaissance', naissance);
  formData.append('etat', etat);  formData.append('telephone', telephone);  formData.append('profession', profesion);formData.append('adresse', adresse);
  formData.append('employeur', employeur);formData.append('telEmployeur', telEmployeur);formData.append('salaire', salaire);formData.append('AdrEmployeur', AdrEmployeur);
  formData.append('soins', soins);formData.append('frais', frais);
  console.log(JSON.stringify(this.menu)) 
 
  Swal.fire({
    title: 'Envoi ....',
    html: 'Souscription en cours .....',
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
    
    }
  })
  const that =this;
   this.menuService.createForm(formData).subscribe({
    next(bodyResponse: HttpBodyResponse) {
      Swal.close();
      if(bodyResponse.status==="Success"){
      console.log("data save");
      Swal.fire('Success', '', 'success');
      form.resetForm();       
    }else {
     Swal.fire('Error!', '', 'error');
    }
    },
    error(err) {
      Swal.close();
      console.log(err)
;    },
   });
    
 }
  onUpdate() {
    const that=this;
  this.menuService.update(this.menu).subscribe({
    next(bodyResponse: HttpBodyResponse) {
      if(bodyResponse.status==="Success"){
        console.log("data save");
         }
    },
    error(err) {
      console.log(err)
    },
  })
}
}
