
import { MonitorOp } from './monitorOp';
import { MonitoropService } from './monitorop.service';
import {
  Component, OnInit,
  ViewChild, Input
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-monitorop',
  templateUrl: './monitorop.component.html',
  styleUrls: ['./monitorop.component.scss']
})
export class MonitoropComponent implements OnInit {
  op = '';
  lot = '';
  data: any;
  monitorOp: MonitorOp[];
  displayedColumns: string[] = ['prioridade',
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
    'dtPriori'
  ];
  dataSource: any;

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

  apllyPriori() {
    const prioridade = 10;
    let color = '';
    if (prioridade === 10) {
      color = 'red';
    }
    console.log(color);
    return color;
  }

  getTableOPv2() {
    this.monitorService.getTableMonOP()
      .pipe(map(response => {
        const resJson = this.monitorService.convertXMLtoJSON(response);
        const opArray = [];
        // tslint:disable-next-line:forin
        for (const key in resJson) {
          opArray.push({ ...resJson[key], id: key });
        }
      })).subscribe();
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

      });
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
