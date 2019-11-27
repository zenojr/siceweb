import { Component, OnInit } from '@angular/core';
import { RepassadeiraService } from './repassadeira.service';
import { MonitoropService } from '../monitorop/monitorop.service';
import { LoginService } from '../login/login.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-repassadeira',
  templateUrl: './repassadeira.component.html',
  styleUrls: ['./repassadeira.component.scss']
})
export class RepassadeiraComponent implements OnInit {

  constructor( private     repService: RepassadeiraService,
               private monitorService: MonitoropService,
               private   loginService: LoginService ) { }
  ngOnInit() {  

    this.getDataOp();
  }

  getDataOp() {
    this.repService.getOpRepassadeiras()
                   .pipe(map(res => {
                     const resJson = this.monitorService.convertXMLtoJSON(res);
                     return resJson;
                    })).subscribe(doc => {
                      let monOp = doc;
                      console.log(monOp);
                    });
  }

}
