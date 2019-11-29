import { HttpClient         } from '@angular/common/http';
import { MonitorOp          } from './monitorOp';
import { MonitoropService   } from './monitorop.service';
import { Component, OnInit, 
         ViewChild          } from '@angular/core';
import { MatPaginator       } from '@angular/material/paginator';
import { MatSort            } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map                } from 'rxjs/operators';
import { MatSnackBar        } from '@angular/material/snack-bar';
import { Router             } from '@angular/router';
import { LoginService       } from '../login/login.service';

export interface Repass {
         dtOp: string;
        numOp: number;
 repassadeira: number;
      seqItem: number;
      destino: string;
}

@Component({
     selector: 'app-monitorop',
  templateUrl: './monitorop.component.html',
    styleUrls: ['./monitorop.component.scss']
})

export class MonitoropComponent implements OnInit {
       op       = '';
     lote       = '';
  valLoad       = 0;
  loading       = true;
    dbOut       = false;
   reload       = false;
  sending       = false;
  user          = '';
  setor         = null;
  repassa       = null;
  monitorOP     = null;
  expedicao     = null;
  countReconect = 0;
  start         = 10;
  arrOut        = [];

       error: any;
    repLocal: string[] = [];  
        data: any;
  dataSource: any;
   monitorOp: MonitorOp[];
  displayedColumns: string[] = [
    'prioridade',
    'repassadeira',
    'destino',
    'numOp',
    'nrPedido',
    'lote',
    'itCodigo',
    'descItem',
    'dimBob',
    'dimBobDest',
    'endereco',
    'quantPed',
    'quantRolo',
    'quantRet',
    'quantSuc',
    'dtPriori'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,      { static: true }) sort:      MatSort;

  constructor(private monitorService: MonitoropService, 
              public            http: HttpClient,
              private       snackBar: MatSnackBar,
              public    loginService: LoginService,
              private          route: Router) {
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngOnInit() {
       this.loginService.currentUser.subscribe( user      => this.user      = user );
      this.loginService.currentSetor.subscribe( setor     => this.setor     = setor );
    this.loginService.currentRepassa.subscribe( repassa   => this.repassa   = repassa );
    this.loginService.currentMonitor.subscribe( monitor   => this.monitorOP = monitor );
  this.loginService.currentExpedicao.subscribe( expedicao => this.expedicao = expedicao );

    if( this.user == 'NULL' || this.setor == 'NULL' ) {
        console.log('Get out')
        this.route.navigateByUrl('/');
    } else if ( this.monitorOP == 'yes' ) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getTableOP();
    }
  }
  
  sendRepassadeiras() {
    if( this.arrOut == null ){
      this.snackBar.open('Nenhum produto selecionado.', '[X] Fechar', { duration: 5000});
    } else {
      this.sending = true;
      const recebe = this.arrOut;
      const url = 'http://192.168.0.7:8080/cgi-bin/wspd_cgi.sh/WService=emswebelttst/scb002wsV2.p';
      let bigStringOut = '';
      recebe.forEach( data => {
        const bigString = data.dtOp         + ',' +
                          data.numOp        + ',' +
                          data.repassadeira + ',' +
                          data.seqItem      + ',' + 
                          data.destino      + ';';
        bigStringOut += bigString;
    });
    console.log(bigStringOut);
    this.http.get( url + '?recebe=' + bigStringOut, { responseType: 'text' } )
    .subscribe(doc => {
      console.log(' Data Send ' + doc )
      if( doc == 'OK' ) {        
        this.arrOut = [];
        this.getTableOP();        
      } else {
        this.snackBar.open('Erro ao gravar dados', '[X] Fechar', { duration: 5000 });
        setTimeout( () => {
          location.reload();          
        }, 5000 );        
      }
    }, error => this.error = console.log(error)); 
    }    
  }

  getRepassadeiras(dtOp, numOP, valorRep, seqItem, destino) {
    let dataRep: Repass
    let valor = valorRep.value;
    let op    = numOP;
    let seq   = seqItem;
    let dt    = dtOp;
    let dest  = destino    
    dataRep   = { numOp: op,
                  dtOp: dt,
                  repassadeira: valor,
                  seqItem: seq,
                  destino: dest };
    this.arrOut.forEach( doc => {    
      if ( doc.numOp == op && doc.seqItem == seq ) {
           doc.numOp = op;
           doc.dtOp = dt;
           doc.repassadeira = valor;
           doc.seqItem = seq;
           doc.destino = dest;
           op    = null;
           dt    = null;
           valor = null;
           seq   = null;
           dest  = null;
           console.log(this.arrOut);
      }
    });

    if ( op != null && seq != null ) {
      this.arrOut.push(dataRep);
      console.log(this.arrOut);
    }
  }

  reloadTableOP(){
    this.loading = true;
    this.getTableOP();
  }

  countDown(){
    if( this.countReconect > 0 ) {
      let start = this.countReconect;
       let down = 1;
        let log = 0;
            log = start - down;
      this.countReconect = log;
      console.log(this.countReconect);        
    } else {
      this.loading = true;
        this.dbOut = false;                
           
    }    
    return this.countReconect;
  }

  getTableOP() {
    this.monitorService.getTableMonOP()
      .pipe(map(res => {
        const resJson = this.monitorService.convertXMLtoJSON(res);
        return resJson;
      })).subscribe(doc => {
        let monOp = doc;
        monOp = monOp['Root'];
        if( monOp == undefined ) {
          console.log( 'Database is Out');
          this.countReconect = 10;
          this.loading = false;
          this.dbOut = true;          
          let execute = setInterval( () => {
            if( this.countReconect >= 1 ){
              this.countDown();
            } else {
              clearInterval(execute);
              this.countReconect = -1;
              location.reload();
            }            
          }, 1000);
          return execute;
        } else {
          monOp = monOp['ttOp'];        
          monOp = monOp['Registro'];
          this.dataSource.data = monOp;
          this.loading = false;
          this.sending = false;
          this.reload  = false;
        }
      }, error => this.error = console.log('This ' +  error)
      );
  }

  clear(filterValue: string) {
    this.op = '';
    this.applyFilter(filterValue);
  }

  clearlot(filterValue: string) {
    this.lote = '';
    this.applyFilter(filterValue);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
