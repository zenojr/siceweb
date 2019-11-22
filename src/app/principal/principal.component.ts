import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../login/login.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  animations: []
})
export class PrincipalComponent implements OnInit {

  monitor = false;
  user = '';
  setor = '';
  repassa = '';
  monitorOP = '';
  expedicao = '';
  constructor( public loginService: LoginService ) { }

  ngOnInit() {
    this.loginService.currentUser.subscribe( user => this.user = user );
    this.loginService.currentSetor.subscribe( setor => this.setor = setor );
    this.loginService.currentRepassa.subscribe( repassa => this.repassa = repassa );
    this.loginService.currentMonitor.subscribe( monitor => this.monitorOP = monitor );
    this.loginService.currentExpedicao.subscribe( expedicao => this.expedicao = expedicao );
    console.log(this.user + ' ' + this.setor + ' ' + 
                this.repassa + ' ' + this.monitorOP + ' ' +
                this.expedicao);
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
