import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  animations: []
})
export class PrincipalComponent implements OnInit {

  monitor = false;
  user = '';
  setor = null;
  repassa = null;
  monitorOP = null;
  expedicao = null;
  constructor( public loginService: LoginService,
               private route: Router ) { }

  ngOnInit() {
    this.loginService.currentUser.subscribe( user => this.user = user );
    this.loginService.currentSetor.subscribe( setor => this.setor = setor );
    this.loginService.currentRepassa.subscribe( repassa => this.repassa = repassa );
    this.loginService.currentMonitor.subscribe( monitor => this.monitorOP = monitor );
    this.loginService.currentExpedicao.subscribe( expedicao => this.expedicao = expedicao );
    console.log(this.user + ' ' + this.setor + ' ' + 
                this.repassa + ' ' + this.monitorOP + ' ' +
                this.expedicao);
    this.guardData();
  }

  guardData(){
    if( this.user == 'NULL' || this.setor == 'NULL' ) {
      console.log('Get out')
      this.route.navigateByUrl('/');
    } 
  }

  showPosition(position) {
    const location = {
      longitude: position.coords.longitude,
       latitude: position.coords.latitude
    };
    console.log(location);
  }

  menuControl() {
    if ( this.monitor === false ) {
      this.monitor = true;
    } else {
      this.monitor = false;
    }
    console.log(this.monitor)
  }
}
