import { Component, OnInit } from '@angular/core';
import { trigger,
         state,
         style,
         animate,
         transition        } from '@angular/animations';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  animations: [
    
  ]
})
export class PrincipalComponent implements OnInit {

  monitor = false;

  constructor() { }

  ngOnInit() {
  }

  menuControl() {
    if ( this.monitor === false ) {
      this.monitor = true;
    } else {
      this.monitor = false;
    } 
  }
}
