import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = 'http://192.168.0.7:8080/cgi-bin/wspd_cgi.sh/WService=emswebelt/scb003ws_new.p?';

  constructor( private     http: HttpClient,
               private xml2Json: NgxXml2jsonService ) { }

  login(usuario: string,  sistema: string, senha: string) {
    const headers = new HttpHeaders();
    const request = this.http.get(this.url + 'usuario=' + usuario + '&sistema=' + sistema + '&senha=' + senha, { responseType: 'text' } );
    return request;
  }

  convertXMLtoJSON(doc) {
    const   data =  doc.toString();
    const parser = new DOMParser();
    const    xml = parser.parseFromString( data, 'text/xml' );
    const   json = this.xml2Json.xmlToJson(xml);
    return json;
  }

}
