import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User.model';
import { FlashService } from 'src/app/services/flash.service';
import { PaiementService } from 'src/app/services/paiement.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import { HttpBodyResponse } from 'src/app/utilities/HttpBodyResponse';
import { UserRequest } from 'src/app/utilities/UserRequest';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  users: any=[];
  user: User= new User;
  roles: any=[];
  flashs: any=[]

  id: number =0;
  role_id :number=0;
  
  usersSubscription: Subscription = new Subscription; 
  rolesSubscription : Subscription = new Subscription;
  flashSubscription : Subscription = new Subscription;
  constructor(private userService : PaiementService, private roleService: RoleService,private flashService: FlashService) {
    
   }

  ngOnInit(): void {
    const that= this;
    this.usersSubscription= this.userService.list().subscribe(
      {next(bodyResponse: HttpBodyResponse) {
       if(bodyResponse.status==="Success"){
        that.users=bodyResponse.response;
        console.log(that.users);
       }
        
      },
       error(error) {
      console.log(error);
     }})
     this.rolesSubscription= this.roleService.list().subscribe({
      next(bodyResponse: HttpBodyResponse) {
        if(bodyResponse.status==="Success"){
         that.roles=bodyResponse.response;
         console.log(that.roles);
        }
         
       },
      error(err) {
        console.log(err)
      },
     });
  this.flashs =  this.flashService.list().subscribe({
    next(bodyResponse: HttpBodyResponse) {
      if(bodyResponse.status==="Success"){
       that.flashs=bodyResponse.response;
       console.log(that.users);
      }
       
    },
    error(err) {
      
    },
  })
  }

  getUser(id: number) {
    const that= this;
    this.id=id;

    this.usersSubscription= this.userService.getItem(id).subscribe({
      next(bodyResponse: HttpBodyResponse) {
        if(bodyResponse.status==="Success"){
          that.user=bodyResponse.response;
          that.role_id=that.user.role.id;
          console.log(that.user);
         }
      },
      error(err) {
        console.log(err);
      },
    });
  }
  onSubmit(form: NgForm) {
     console.log(form.value['role_id']);
    var  email =form.value['email'];
    var noms =form.value['noms'];
    var cuid =form.value['cuid'];
    var role=form.value['role_id'];
    Swal.fire({
      title: 'Envoi ....',
      html: 'Souscription en cours .....',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      
      }
    })

   console.log(JSON.stringify(new UserRequest(null,noms,cuid,email,role))) 

   this.userService.create(new UserRequest(null,noms,cuid,email,role)).subscribe({
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
  getId(id:number) {
    this.id=id;
  }

  delete() {
    this.userService.delete(this.id).subscribe(
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
  rolechange(role : any) {
    this.role_id=role.value;
    console.log("role_id : "+role.value);
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
  this.userService.update(new UserRequest(this.user.id,this.user.noms,this.user.username,this.user.email,this.role_id)).subscribe({
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
