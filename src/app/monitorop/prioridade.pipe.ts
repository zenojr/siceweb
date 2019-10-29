import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'prioridade'
})
export class PrioridadePipe implements PipeTransform {


  transform(value: any, ...args: any[]): any {
    let data = value
    if (data == 10) {
      return data 
    } else if ( data == 8 ) {
      data = 'Mudou';
      return data;
    }
  }

}
