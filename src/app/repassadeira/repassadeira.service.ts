import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Injectable({
  providedIn: 'root'
})
export class RepassadeiraService {

  constructor( private http: HttpClient,
               private xml2Json: NgxXml2jsonService ) { }

getOpRepassadeiras() {

}               
               
}
