import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Scoop } from 'src/app/models/Scoop.model';
import { ScoopService } from 'src/app/services/scoop.service';
import { HttpBodyResponse } from 'src/app/utilities/HttpBodyResponse';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  scoop :Scoop =new Scoop
  scoopSubscription: Subscription = new Subscription
  constructor(private scoopService : ScoopService) { }

  ngOnInit(): void {
    const that =this;
    this.scoopSubscription = this.scoopService.getItem(1).subscribe({
     next (bodyResponse: HttpBodyResponse) {
        if(bodyResponse.status==="Success"){
          that.scoop=bodyResponse.response;
          console.log(that.scoop);
         }
      },
      error(err) {
        console.log(err);
      },
    });
  }

}
