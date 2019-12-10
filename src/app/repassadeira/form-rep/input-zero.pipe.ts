import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inputZero'
})
export class InputZeroPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let valor = 0
    if( value == null || value == ' ' ) {
        return valor;
    } else {
      return value;
    }
    
  }

}
