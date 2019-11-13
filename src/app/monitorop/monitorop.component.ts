import { HttpClient } from '@angular/common/http';
import { MonitorOp } from './monitorOp';
import { MonitoropService } from './monitorop.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Repass {
  dtOp: string;
  numOp: number;
  repassadeira: number;
  seqItem: number;
}

@Component({
  selector: 'app-monitorop',
  templateUrl: './monitorop.component.html',
  styleUrls: ['./monitorop.component.scss']
})

export class MonitoropComponent implements OnInit {
  op = '';
  lote = '';
  loading = true;
  selected = 0;
  error: any;
  repLocal: string[] = [];
  arrOut = [];
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
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private monitorService: MonitoropService, public http: HttpClient) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getTableOP();
  }

  sendRepassadeiras() {
    const recebe = this.arrOut;
    // console.log('recebe: ' + recebe);
    const url = 'http://192.168.0.7:8080/cgi-bin/wspd_cgi.sh/WService=emswebelt/scb002V2ws.p';
    let bigStringOut = '';
    // recebe.forEach(element => {
    //     const bigString = element + ';'
    //     bigStringOut += bigString;
    // });
    // console.log(bigStringOut);
    recebe.forEach( data => {
      const bigString = data.dtOp + ',' +
                        data.numOp + ',' +
                        data.repassadeira + ',' +
                        data.seqItem + ';';
      bigStringOut += bigString;
    });
    console.log(bigStringOut);
    return this.http.get( url + '?recebe=' + bigStringOut ).subscribe(doc => console.log(' Data Send ' + doc));
  }


  getRepassadeiras(dtOp, numOP, valorRep, seqItem) {
    let dataRep: Repass
    let valor = valorRep.value;
    let op    = numOP;
    let seq   = seqItem;
    let dt    = dtOp;
    
    dataRep   = { numOp: op,
                  dtOp: dt,
                  repassadeira: valor,
                  seqItem: seq };

    this.arrOut.forEach( doc => {
      // console.log( 'dentro do array ' + doc.numOp + ' = ' + op + ' and ' + doc.seqItem + ' = ' + seq );      
      if ( doc.numOp == op && doc.seqItem == seq ) {
           doc.numOp = op;
           doc.dtOp = dt;
           doc.repassadeira = valor;
           doc.seqItem = seq;
           op = null;
           dt = null;
           valor = null;
           seq = null;
           console.log('Inside Repeat');
           console.log(this.arrOut);
      }
    });
    
    if ( op != null && seq != null ) {
      this.arrOut.push(dataRep);
      console.log(this.arrOut);
    }
    

    // let arrayControl = []

    // arrayControl.push(op, dt, valor, seq);
    // console.log(arrayControl);
    // this.arrOut.push(arrayControl);
    // console.log(this.arrOut);
    
  }

  getTableOP() {
    this.monitorService.getTableMonOP()
      .pipe(map(res => {
        const resJson = this.monitorService.convertXMLtoJSON(res);
        return resJson;
      })).subscribe(doc => {
        let monOp = doc;
        monOp = monOp['Root'];
        monOp = monOp['ttOp'];
        monOp = monOp['Registro'];
        console.log(monOp);
        this.dataSource.data = monOp;
        this.loading = false;
      }, error => this.error = console.log(error)
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
