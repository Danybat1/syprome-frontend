import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Flash } from 'src/app/models/Flash.Model';
import { TypePaiementService } from 'src/app/services/typepaiement.service';
import { HttpBodyResponse } from 'src/app/utilities/HttpBodyResponse';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.css']
})
export class FlashComponent implements OnInit {

flash:Flash=new Flash
flashs:any =[];
flashSubscription:Subscription=new Subscription
id:number=0;
  constructor(private flashService: TypePaiementService) { }

  ngOnInit(): void {
    const that=this;
    this.flashSubscription=this.flashService.list().subscribe({
      next(bodyResponse: HttpBodyResponse) {
        if(bodyResponse.status==="Success"){
          that.flashs=bodyResponse.response;
           }
      },
      error(err) {
        console.log(err)
      },
    });
  }

  getId(id: number) {
  this.id=id;
  }
  getFlash(id: number) {
    const that=this;
    this.flashSubscription=this.flashService.getItem(id).subscribe({
      next(bodyResponse: HttpBodyResponse) {
        if(bodyResponse.status==="Success"){
          that.flash=bodyResponse.response;
           }
      },
      error(err) {
        console.log(err)
      },
    });
  }

    submit(form: NgForm) {
      console.log("submit run");
      Swal.fire({
        title: 'Envoi ....',
        html: 'Souscription en cours .....',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        
        }
      })
      this.flash.intitule=form.value['intitule'];
     //this.flash.contenu=form.value['contenu'];
     this.flash.debut="form.value['debut']";
     console.log(this.flash.debut);
     this.flash.fin= "form.value['fin']";
     this.flash.id=null;
     const that=this;
     this.flashSubscription=this.flashService.create(this.flash).subscribe({
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
    update() {
      const that=this;
    
      Swal.fire({
        title: 'Envoi ....',
        html: 'Souscription en cours .....',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        
        }
      })
      this.flashSubscription=this.flashService.update(this.flash).subscribe({
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
    delete() {
      const that=this;
      this.flashSubscription=this.flashService.delete(this.id).subscribe({
        next(bodyResponse: HttpBodyResponse) {
          if(bodyResponse.status==="Success"){
           console.log("value delete");
             }
        },
        error(err) {
          console.log(err)
        },
      });
    }

}
