import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'http://192.168.0.7:8080/cgi-bin/wspd_cgi.sh/WService=emswebelt/scb003ws_new.p?';

  constructor( private http: HttpClient ) { }


  login(usuario: string,  sistema: string, senha: string) {
    const headers = new HttpHeaders();
    return this.http.get(this.url + 'usuario=' + usuario + '&sistema=' + sistema + '&senha=' + senha, { headers } );
  }

}
