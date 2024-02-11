import { AfterViewInit, Component, OnInit } from '@angular/core';

declare function Bat(): void;
declare function Design(): void;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  
 
  title = 'basedeco';
  constructor () {
 //   
  }
  ngAfterViewInit(): void {
  
   Bat();
   Design();
  }
  

}
