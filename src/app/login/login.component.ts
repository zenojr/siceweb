import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user  = '';
  senha = '';
  sistema = 'REP';

  constructor( private loginService: LoginService ) { }

  ngOnInit() {

  }

  login() {
    const recieve = this.loginService.login( this.user, this.sistema, this.senha ).subscribe( data => console.log(data) );
  }

}
