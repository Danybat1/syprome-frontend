import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Scoop } from 'src/app/models/Scoop.model';
import { FlashService } from 'src/app/services/flash.service';
import { ScoopService } from 'src/app/services/scoop.service';
import { HttpBodyResponse } from 'src/app/utilities/HttpBodyResponse';

@Component({
  selector: 'app-scoop',
  templateUrl: './scoop.component.html',
  styleUrls: ['./scoop.component.css']
})
export class ScoopComponent implements OnInit {

 scoop :Scoop= new Scoop
 scoops:any=[];
 flashs:any=[];
 scoopSubscription: Subscription = new Subscription
 flashSubscription: Subscription = new Subscription


  constructor(private scoopService : ScoopService,private flashService: FlashService) {

   }

  ngOnInit(): void {
    const that =this;
    this.scoopSubscription = this.scoopService.list().subscribe({
     next (bodyResponse: HttpBodyResponse) {
        if(bodyResponse.status==="Success"){
          that.scoops=bodyResponse.response;
          console.log(that.scoops);
         }
      },
      error(err) {
        console.log(err);
      },
    });
    this.flashSubscription = this.flashService.list().subscribe({
      next (bodyResponse: HttpBodyResponse) {
         if(bodyResponse.status==="Success"){
           that.flashs=bodyResponse.response;
          }
       },
       error(err) {
         console.log(err);
       },
     });
  }

  getScoop(id: number) {
    const that =this;
    this.scoopSubscription = this.scoopService.getItem(id).subscribe({
     next (bodyResponse: HttpBodyResponse) {
        if(bodyResponse.status==="Success"){
          that.scoop=bodyResponse.response;
        
         }
      },
      error(err) {
        console.log(err);
      },
    });
  
  }

  update() {
    console.log("update clicked");
    const that =this;
    this.scoopSubscription = this.scoopService.update(this.scoop).subscribe({
     next (bodyResponse: HttpBodyResponse) {
        if(bodyResponse.status==="Success"){
          console.log("data updated");
          that.scoop=bodyResponse.response;
         }
      },
      error(err) {
        console.log(err);
      },
    });
  }

}
