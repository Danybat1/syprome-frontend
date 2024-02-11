import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Menu } from 'src/app/models/Menu.model';
import { User } from 'src/app/models/User.model';
import { Member } from 'src/app/models/member.model';
import { FlashService } from 'src/app/services/flash.service';
import { MenuService } from 'src/app/services/menu.service';
import { HttpBodyResponse } from 'src/app/utilities/HttpBodyResponse';
import { Utils } from 'src/app/utilities/utils';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menus:any=[];
  menu:Menu=new Menu;
  membre:Member=new Member;
  flashs: any=[];
  id: number =0;
   photo:any;
  menuSubscription: Subscription = new Subscription;
  flashSubscription : Subscription = new Subscription;


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
          that.membre=bodyResponse.response;
          that.photo=Utils.apiURL+"/api/v1/membre/image/"+that.membre.photo;
          that.photo=that.photo.replace("/uploads","")
          console.log(that.photo);
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
   
  console.log(JSON.stringify(this.menu)) 

  this.menuService.create(this.menu).subscribe({
   next(bodyResponse: HttpBodyResponse) {
     if(bodyResponse.status==="Success"){
     console.log("data save");
      }
   },
   error(err) {
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
