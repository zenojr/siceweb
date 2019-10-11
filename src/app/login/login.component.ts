import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user  = '';
  senha = '';
  sistema = 'REP';

  constructor( public http: HttpClient, public loginService: LoginService ) { }

  ngOnInit() {

  }

  login() {
    this.loginService.login( this.user, this.sistema, this.senha )
      .subscribe( data => {
        console.log(data);
        
      } );
  }

}
