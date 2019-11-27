import { MatSnackBar       } from '@angular/material';
import { LoginService      } from './login.service';
import { Component, OnInit } from '@angular/core';
import { Router            } from '@angular/router';
import { MonitoropService  } from '../monitorop/monitorop.service';

@Component({
     selector: 'app-login',
  templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  user    = '';
  senha   = '';
  sistema = 'REP';

  constructor( private  loginService: LoginService,
               private      snackBar: MatSnackBar,
               private         route: Router,
               public monitorService: MonitoropService ) { }
  ngOnInit( ) {

  }

  login() {
    let loginData = this.loginService.login( this.user, this.sistema, this.senha );
    loginData.subscribe( data => {
      if ( data === 'NOK' ) {
        this.snackBar.open('Usuário ou senha inválido', 'Fechar', {
          duration: 2000,
        });
      } else {
        console.log('login OK');
        this.route.navigateByUrl('/principal');
          let loginJSON = this.loginService.convertXMLtoJSON(data); 
              loginJSON = loginJSON["Root"];
              loginJSON = loginJSON["ttLogin"];
              loginJSON = loginJSON["Registro"];
          const usuario = loginJSON["usuario"];
            const setor = loginJSON["setor"];
          const repassa = loginJSON["repassa"];
            const monOP = loginJSON["monitorOp"];
        const expedicao = loginJSON["expedicao"];
        console.log(loginJSON);
        this.loginService.getLoginUser(usuario, setor, repassa, monOP, expedicao);
      }
    });
  }
}
