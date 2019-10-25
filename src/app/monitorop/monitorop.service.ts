import { MonitorOp } from './monitorOp';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Injectable({
  providedIn: 'root'
})
export class MonitoropService {

  urlMonOP = 'http://192.168.0.7:8080/cgi-bin/wspd_cgi.sh/WService=emswebelt/scb001ws.p?seq=0';

  constructor( private http: HttpClient,
               private xml2Json: NgxXml2jsonService ) { }

  getTableMonOP() {
    const request = this.http.get(this.urlMonOP, { responseType: 'text' }  );
    return request;
  }

  convertXMLtoJSON(doc) {
    const   data = doc.toString();
    const parser = new DOMParser();
    const    xml = parser.parseFromString( data, 'text/xml' );
    const   json = this.xml2Json.xmlToJson(xml);
    return json;
  }

}
