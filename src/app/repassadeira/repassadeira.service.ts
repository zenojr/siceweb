import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { MonitoropService   } from '../monitorop/monitorop.service';

@Injectable({
  providedIn: 'root'
})
export class RepassadeiraService {

  urlOpRepassadeiras = 'http://192.168.0.7:8080/cgi-bin/wspd_cgi.sh/WService=emswebelttst/scb004ws.p?';

  constructor( private     http: HttpClient,
               private     monOpServ: MonitoropService ) { }

getOpRepassadeiras(numRepassa) {
  const request = this.http.get(this.urlOpRepassadeiras + 'numRepassa=' + numRepassa, 
                  { responseType: 'text', reportProgress: true });
  return request;
}

getMotDev(tipo){
  let motDevolucao: any;
  let motSucata: any;
  if( tipo === 'devolucao' ){
    const url = 'http://192.168.0.7:8080/cgi-bin/wspd_cgi.sh/WService=emswebelttst/scb013ws.p?tipo=' + tipo;
    this.http.get( url, {responseType: 'text'} ).subscribe( response => {
      motDevolucao = this.monOpServ.convertXMLtoJSON(response);
      motDevolucao = motDevolucao['Root'];
      motDevolucao = motDevolucao['ttProblema'];
      motDevolucao = motDevolucao['Registro'];
      return motDevolucao;
    });
  } else if( tipo === 'sucata' ){
    const url = 'http://192.168.0.7:8080/cgi-bin/wspd_cgi.sh/WService=emswebelttst/scb013ws.p?tipo=' + tipo;
    this.http.get( url, {responseType: 'text'} ).subscribe( response => {
      motSucata = this.monOpServ.convertXMLtoJSON(response);
      motSucata = motSucata['Root'];
      motSucata = motSucata['ttProblema'];
      motSucata = motSucata['Registro'];
      return motSucata;
  });
  }
}


}
