import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Agence } from 'src/app/models/agence.Model';
import { Categorie } from 'src/app/models/Categorie.Model';
import { AgenceService } from 'src/app/services/agence.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { FlashService } from 'src/app/services/flash.service';
import { MenuService } from 'src/app/services/menu.service';
import { CategorieRequest } from 'src/app/utilities/CategorieRequest';
import { HttpBodyResponse } from 'src/app/utilities/HttpBodyResponse';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

categories: any=[];
categorie: Agence=new Agence();

menu_id:number=0;
id:number=0;

categorieSubscription: Subscription= new Subscription

  constructor(private categorieService:AgenceService) { }

  ngOnInit(): void {
    const that=this;
  
    this.categorieSubscription=this.categorieService.list().subscribe({
      next(bodyResponse: HttpBodyResponse) {
        if(bodyResponse.status==="Success"){
         that.categories=bodyResponse.response;
         console.log(that.categories);
        }
         
       },
      error(err) {
        console.log(err)
      },
    });
  }

  getCategorie(id:number) {
    const that= this;
    this.id=id;

    this.categorieSubscription= this.categorieService.getItem(id).subscribe({
      next(bodyResponse: HttpBodyResponse) {
        if(bodyResponse.status==="Success"){
          that.categorie=bodyResponse.response;
          console.log(that.categorie);
         }
      },
      error(err) {
        console.log(err);
      },
    });
    }
    getId(id:number) {
      this.id=id;
    }
  onSubmit(form: NgForm) {
    console.log(form.value['menu_id']);
    var  description =form.value['description'];
    Swal.fire({
      title: 'Envoi ....',
      html: 'Souscription en cours .....',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      
      }
    })

   console.log(JSON.stringify(new CategorieRequest(null,description,0))) 

   this.categorieService.create(new CategorieRequest(null,description,0)).subscribe({
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
      console.log(err);
        },
    });
    }
  delete() {
    this.categorieService.delete(this.id).subscribe(
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

  onUpdate() {
    const that=this;
    Swal.fire({
      title: 'Envoi ....',
      html: 'Souscription en cours .....',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      
      }
    })
    this.categorieService.update(new CategorieRequest(this.categorie.id,this.categorie.intitule,0)).subscribe({
      next(bodyResponse: HttpBodyResponse) {
        Swal.close();
      if(bodyResponse.status==="Success"){
      console.log("data save");
      Swal.fire('Success', '', 'success');
  
             
    }else {
     Swal.fire('Error!', '', 'error');
    }
    },
    error(err) {
      Swal.close();
      console.log(err);
        },
    });
      
    }
 menuChange(menu:any) {
  this.menu_id=menu.value;
  console.log("menu_id : "+menu.value);
    }

}
