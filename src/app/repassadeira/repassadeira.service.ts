import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Injectable({
  providedIn: 'root'
})
export class RepassadeiraService {

  urlOpRepassadeiras = 'http://192.168.0.7:8080/cgi-bin/wspd_cgi.sh/WService=emswebelttst/scb004ws.p?';

  constructor( private     http: HttpClient,
               private xml2Json: NgxXml2jsonService ) { }

getOpRepassadeiras(numRepassa) {
  const request = this.http.get(this.urlOpRepassadeiras + 'numRepassa=' + numRepassa, 
                  { responseType: 'text', reportProgress: true });
  return request;
}               
               
}
