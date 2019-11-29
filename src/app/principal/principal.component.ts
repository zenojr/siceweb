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
  monitorMenu      = true;
  repassadeiraMenu = true;
  expedicaoMenu    = true;
  user      = '';
  setor     = null;
  repassa   = null;
  monitorOP = null;
  expedicao = null;
  constructor( public loginService: LoginService,
               private route: Router ) { }

  ngOnInit() {
    this.loginService.currentUser.subscribe     ( user    => this.user          = user );
    this.loginService.currentSetor.subscribe    ( setor   => this.setor         = setor );
    this.loginService.currentRepassa.subscribe  ( repassa => this.repassa       = repassa );
    this.loginService.currentMonitor.subscribe  ( monitor => this.monitorOP     = monitor );
    this.loginService.currentExpedicao.subscribe( expedicao => this.expedicao = expedicao );
    console.log( ' User: '      + this.user     + 
                 ' Setor: '     + this.setor    + 
                 ' Repassa: '   + this.repassa  + 
                 ' MonitorOp: ' + this.monitorOP+ 
                 ' Expedição: ' + this.expedicao);
    this.guardData();
  }

  guardData(){
    if( this.user == 'NULL' || this.setor == 'NULL' ) {
      console.log('Get out')
      this.route.navigateByUrl('/');
    } else if( this.monitorOP == 'no' ){
             this.monitorMenu = false;
    } else if( this.repassa == 'no' ){
             this.repassadeiraMenu = false;
    } else if( this.expedicao == 'no' ) {
             this.expedicaoMenu = false;
    }
  }

  showPosition(position) {
    const location = {
      longitude: position.coords.longitude,
       latitude: position.coords.latitude
    };
    console.log(location);
  }

  
}