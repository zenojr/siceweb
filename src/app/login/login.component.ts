import { MatSnackBar } from '@angular/material';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user    = '';
  senha   = '';
  sistema = 'REP';

  constructor( private loginService: LoginService,
               private     snackBar: MatSnackBar,
               private        route: Router ) { }

  ngOnInit( ) {

  }

  login() {
    this.loginService.login( this.user, this.sistema, this.senha )
    .subscribe( data => {
      console.log(data);
      if ( data === 'NOK' ) {
        this.snackBar.open('Usuário ou senha inválido', 'Fechar', {
          duration: 2000,
        });

      } else {
        console.log('login OK');
        this.route.navigateByUrl('/principal');
      }
    });
  }

}
