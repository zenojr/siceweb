import { Injectable   } from '@angular/core';
import { DialogSelect } from './selectModel';

@Injectable({
  providedIn: 'root'
})
export class SelectRepService {

  constructor() { }

  getCurrentRepass ( repass: string ) {
    return repass;
  }

  setRepass() {

  }
}
