import { MonitorOp } from './monitorOp';
import { MonitoropService } from './monitorop.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

export interface DataServer {
      itCodigo: string;
      descItem: string;
      endereco: string;
      endExp: string;
      lote: string;
      operador: string;
      produzido: string;
      codLote: string;
      vcLance: string;
      observ: string;
      nomeCli: string;
      bobMad: string;
      finalBob: string;
      podeVar: string;
      dimBob: string;
      dimBobDest: string;
      descPriori: string;
      devProd: string;
      statusLab: string;
      hrPriori: string;
      amostra: string;
      corteRol: string;
      numOpPend: string;
      destino: string;
      dtPriori: string;
      dtProducao: string;
      dtOp: string;
      quantPed: string;
      qtPedMin: string;
      qtPedMax: string;
      quantRolo: string;
      quantRet: string;
      quantSuc: string;
      tara: string;
      peso: string;
      ajSpark: string;
      quantEtq: string;
      mPontaFora: string;
      numOp: string;
      nrPedido: string;
      prioridade: string;
      maquina: string;
      numRep: string;
      seqItem: string;
      devRepassa: string;
      codBob: string;
      lance: string;
      codImp: string;
      codProblema: string;
      codProbSuc: string;
      mmValida: string;
      corteBob: string;
      corteRet: string;
      corteSuc: string;
}

export interface DataserverJson {
  ajSpark: string;
  amostra: string;
  bobMad: string;
  codBob: string;
  codImp: string;
  codLote: string;
  codProbSuc: string;
  codProblema: string;
  corteBob: string;
  corteRet: string;
  corteRol: string;
  corteSuc: string;
  descItem: string;
  descPriori: string;
  destino: string;
  devProd: string;
  devRepassa: string;
  dimBob: string;
  dimBobDest: string;
  dtOp: string;
  dtPriori: string;
  dtProducao: string;
  endExp: string;
  endereco: string;
  finalBob: string;
  hrPriori: string;
  itCodigo: string;
  lance: string;
  lote: string;
  mPontaFora: string;
  maquina: string;
  mmValida: string;
  nomeCli: string;
  nrPedido: string;
  numOp: string;
  numOpPend: string;
  numRep: string;
  observ: string;
  operador: string;
  peso: string;
  podeVar: string;
  prioridade: string;
  produzido: string;
  qtPedMax: string;
  qtPedMin: string;
  quantEtq: string;
  quantPed: string;
  quantRet: string;
  quantRolo: string;
  quantSuc: string;
  seqItem: string;
  statusLab: string;
  tara: string;
  vcLance: string;
}

/** Constants used to fill up our data base. */
// const COLORS: string[] = [
//   'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
//   'aqua', 'blue', 'navy', 'black', 'gray'
// ];
// const NAMES: string[] = [
//   'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
//   'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
// ];

// /**
//  * @title Data table with sorting, pagination, and filtering.
//  */


@Component({
  selector: 'app-monitorop',
  templateUrl: './monitorop.component.html',
  styleUrls: ['./monitorop.component.scss']
})
export class MonitoropComponent implements OnInit {
  op  = '';
  lot = '';
  data: any;
  monitorOp: MonitorOp[];

  displayedColumns: string[] = ['repassadeira'];
  dataSource: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor( private monitorService: MonitoropService ) {

    // Assign the data to the data source for the table to render
     this.dataSource = new MatTableDataSource(this.data);
   }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getTableOP();
  }

  getTableOP() {
      this.monitorService.getTableMonOP().subscribe( doc => {
          let localData = this.monitorService.convertXMLtoJSON(doc);
          localData = localData['Root'];
          localData = localData['ttOp'];
          localData = localData['Registro'];
          console.log(localData);
          this.dataSource.data = localData;
      });
  }

  clear( filterValue: string ) {
    this.op = '';
    this.applyFilter(filterValue);
  }

  clearlot( filterValue: string ) {
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
