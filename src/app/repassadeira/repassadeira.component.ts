import { Component, OnInit   } from '@angular/core';
import { RepassadeiraService } from './repassadeira.service';
import { MonitoropService    } from '../monitorop/monitorop.service';
import { LoginService        } from '../login/login.service';
import { map                 } from 'rxjs/operators';

@Component({
  selector: 'app-repassadeira',
  templateUrl: './repassadeira.component.html',
  styleUrls: ['./repassadeira.component.scss']
})
export class RepassadeiraComponent implements OnInit {

  user      = '';
  setor     = null;
  repassa   = null;
  monitorOP = null;
  expedicao = null;

  constructor( private     repService: RepassadeiraService,
               private monitorService: MonitoropService,
               private   loginService: LoginService ) { }
  ngOnInit() {  
    this.loginService.currentUser.subscribe(    user    => this.user      = user );
    this.loginService.currentSetor.subscribe(   setor   => this.setor     = setor );
    this.loginService.currentRepassa.subscribe( repassa => this.repassa   = repassa );
    this.loginService.currentMonitor.subscribe( monitor => this.monitorOP = monitor );
    this.loginService.currentExpedicao.subscribe( expedicao => this.expedicao = expedicao );

    console.log(this.user    + ' ' + this.setor     + ' ' + 
                this.repassa + ' ' + this.monitorOP + ' ' +
                this.expedicao);

    setTimeout( () => {
      this.getDataOp(this.setor);
    }, 2000 );
    
  }

  getDataOp(setor) {
    let repassadeira = setor;    
    repassadeira = repassadeira.slice(13);
    console.log(repassadeira);
    this.repService.getOpRepassadeiras(repassadeira)
                   .pipe(map(res => {
                     const resJson = this.monitorService.convertXMLtoJSON(res);
                     return resJson;
                    })).subscribe(doc => {
                      let monOp = doc;
                      console.log(monOp);
                    });
  }

} // The end
