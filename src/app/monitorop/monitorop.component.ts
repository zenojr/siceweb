
import { MonitorOp } from './monitorOp';
import { MonitoropService } from './monitorop.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Repass {
  repassadeira: string;
  op: number;
  dtop: string;
  seqItem: number;
}

@Component({
  selector: 'app-monitorop',
  templateUrl: './monitorop.component.html',
  styleUrls: ['./monitorop.component.scss']
})
export class MonitoropComponent implements OnInit {
  op = '';
  lot = '';
  loading = true;
  selected = 0;
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
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private monitorService: MonitoropService) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getTableOP();
  }

  getRepassadeiras(valueRep, numOP, seqItem) {
    const valor = valueRep.value;
    const op = numOP;
    const seq = seqItem;
    this.repLocal.push(valor, op, seq);
    console.log(this.repLocal);
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
    this.lot = '';
    this.applyFilter(filterValue);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
