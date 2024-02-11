import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SousCategorie } from 'src/app/models/SousCategorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { CentreService } from 'src/app/services/centre.service';
import { FlashService } from 'src/app/services/flash.service';
import { SousCategorieService } from 'src/app/services/sousCategorie.service';
import { HttpBodyResponse } from 'src/app/utilities/HttpBodyResponse';
import { SousCategorieRequest } from 'src/app/utilities/SousCategorieRequest';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-souscategorie',
  templateUrl: './souscategorie.component.html',
  styleUrls: ['./souscategorie.component.css']
})
export class SouscategorieComponent implements OnInit {


souscategories: any=[];

souscategorie: SousCategorie=new SousCategorie;

categorie_id:number=0;
id:number=0;


souscategorieSubscription: Subscription= new Subscription

  constructor(private sousCategorieService: CentreService) { }

  ngOnInit(): void {
    const that=this;
  
    this.souscategorieSubscription=this.sousCategorieService.list().subscribe({
      next(bodyResponse: HttpBodyResponse) {
        if(bodyResponse.status==="Success"){
         that.souscategories=bodyResponse.response;
         console.log(that.souscategories);
        }
         
       },
      error(err) {
        console.log(err)
      },
    });
  }

  getSousCategorie(id:number) {
    const that= this;
    this.id=id;

    this.souscategorieSubscription= this.sousCategorieService.getItem(id).subscribe({
      next(bodyResponse: HttpBodyResponse) {
        if(bodyResponse.status==="Success"){
          that.souscategorie=bodyResponse.response;
          console.log(that.souscategorie);
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
   
    var  description =form.value['description'];
    
    Swal.fire({
      title: 'Envoi ....',
      html: 'Souscription en cours .....',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      
      }
    })
  
   console.log(JSON.stringify(new SousCategorieRequest(null,description,0))) 

   this.sousCategorieService.create(new SousCategorieRequest(null,description,0)).subscribe({
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
    this.sousCategorieService.delete(this.id).subscribe(
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
    this.sousCategorieService.update(new SousCategorieRequest(this.souscategorie.id,this.souscategorie.intitule,this.categorie_id)).subscribe({
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
 menuChange(categorie:any) {
  this.categorie_id=categorie.value;
  console.log("menu_id : "+categorie.value);
    }


}
