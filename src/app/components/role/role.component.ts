import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Menu } from 'src/app/models/Menu.model';
import { FlashService } from 'src/app/services/flash.service';
import { MenuService } from 'src/app/services/menu.service';
import { RoleService } from 'src/app/services/role.service';
import { HttpBodyResponse } from 'src/app/utilities/HttpBodyResponse';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  menus:any=[];
  menu:Menu=new Menu;
  flashs: any=[];
  id: number =0;

  menuSubscription: Subscription = new Subscription;


  constructor(private menuService:RoleService ) { }

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
    console.log(form.value['description']);
   var  description =form.value['description'];
 
   this.menu.description=description;
   
   Swal.fire({
    title: 'Envoi ....',
    html: 'Souscription en cours .....',
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
    
    }
  })

  this.menuService.create(this.menu).subscribe({
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
  this.menuService.update(this.menu).subscribe({
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
}
