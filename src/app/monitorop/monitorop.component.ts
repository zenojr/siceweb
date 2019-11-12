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
  dtPri: string;
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
    const url = 'http://192.168.0.7:8080/cgi-bin/wspd_cgi.sh/WService=emswebelt/scb002V2ws.p';
    let bigStringOut = '';
    recebe.forEach( data => {
      const bigString = data.dtPri + ',' +
                        data.numOp + ',' +
                        data.repassadeira + ',' +
                        data.seqItem + ';';
      bigStringOut += bigString;
    });
    console.log(bigStringOut);
    return this.http.get( url + '?recebe=' + bigStringOut ).subscribe(doc => console.log(doc));
  }

  sanitizeArr(arrayIn) {
    let array = arrayIn;
    console.log('inside sanitizer: ' + arrayIn);
    array.forEach(element => {
      let lastElement = element;
      console.log('lastNumop: ' + lastElement['numOp']);
      console.log('elementOp: ' + element['numOp']);
    });
  }

  getRepassadeiras(dtPri, numOP, valorRep, seqItem, dataRep: Repass) {
    const valor = valorRep.value;
    const op    = numOP;
    const seq   = seqItem;
    const dt    = dtPri;
    dataRep     = { numOp: op,
                    dtPri: dt,
                    repassadeira: valor,
                    seqItem: seq };

    this.arrOut.push(dataRep);
    console.log(this.arrOut);

    // const arrayInstance =  this.arrOut;
    // let index = 0;
    // arrayInstance.forEach(doc => {
    //   index++;
    //   const currentRep = doc['repassadeira'];
    //   const currentNumOp = doc['numOp'];
    //   if ( currentRep == 0 ) {

    //   }
    //   console.log(currentRep + ' ' +  index);
    // });
    
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
