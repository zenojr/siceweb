import { MonitorOp } from './monitorOp';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Injectable({
  providedIn: 'root'
})
export class MonitoropService {

  urlMonOP = 'http://192.168.0.7:8080/cgi-bin/wspd_cgi.sh/WService=emswebelttst/scb001ws.p?seq=0';
  // urlSendRep = 'http://192.168.0.7:8080/cgi-bin/wspd_cgi.sh/WService=emswebelt/scb002V2ws.p';
  urlSendRep = 'http://192.168.0.7:8080/cgi-bin/wspd_cgi.sh/WService=emswebelttst/scb002wsV2.p';
  urlNodeServer = 'http://192.168.0.241:3000';
  constructor( private http: HttpClient,
               private xml2Json: NgxXml2jsonService ) { }

  getTableMonOP() {
    const request = this.http.get(this.urlMonOP, { responseType: 'text', reportProgress: true });    
    return request;
  }

  sendRep() {
    console.log('send');
    return this.http.get('http://localhost:3000/angular');
  }

  convertXMLtoJSON(doc) {
    const   data = doc.toString();
    const parser = new DOMParser();
    const    xml = parser.parseFromString( data, 'text/xml' );
    const   json = this.xml2Json.xmlToJson(xml);
    return json;
  }

}
