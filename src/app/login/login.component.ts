import { MatSnackBar } from '@angular/material';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { MonitoropService } from '../monitorop/monitorop.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user    = '';
  senha   = '';
  sistema = 'REP';
  loginJsonData: {};

  constructor( private  loginService: LoginService,
               private      snackBar: MatSnackBar,
               private         route: Router,
               public monitorService: MonitoropService ) { }

  ngOnInit( ) {

  }

  login() {
    let loginData = this.loginService.login( this.user, this.sistema, this.senha );
    loginData.subscribe( data => {
      console.log(data);

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
        console.log(loginJSON);
        this.loginJsonData = loginJSON;
      }
    });

  }

  getLogin(data) {
    data.subscribe( res => {
      console.log(res);
      let parser;
      let xmlDoc;
      const text = res;
      
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(text, "text/xml");
      console.log(xmlDoc);

    });
  }

}
