import { Component, OnInit,
         ViewChild, Inject   } from '@angular/core';
import { RepassadeiraService } from './repassadeira.service';
import { MonitoropService    } from '../monitorop/monitorop.service';
import { LoginService        } from '../login/login.service';
import { map                 } from 'rxjs/operators';
import { MatPaginator        } from '@angular/material/paginator';
import { MatSort             } from '@angular/material/sort';
import { MatTableDataSource  } from '@angular/material/table';
import { RepassOp            } from './repassOp';
import { Router } from '@angular/router';
import { MatDialog,
         MatDialogRef, 
         MAT_DIALOG_DATA     } from '@angular/material/dialog';
import { FormRepComponent    } from './form-rep/form-rep.component';

export interface DialogData {
              op: string;
         cliente: string;
         codProd: string;
        descProd: string;
          dimBob: string;
          bobMad: string;
            lote: string;
           lance: number;
           obsOp: string;
        bobFinal: string;
      podeVariar: string;
          varMax: number;
          varMin: number;
          qtdBob: number;
         qtdRolo: number;
      qtdRetalho: number;
       qtdSucata: number;
        corteBob: number;
       corteRolo: number;
        corteRet: number;
        corteSuc: number;
}


@Component({
  selector: 'app-repassadeira',
  templateUrl: './repassadeira.component.html',
  styleUrls: ['./repassadeira.component.scss']
})
export class RepassadeiraComponent implements OnInit {

  animal: string;
  name = 'stringteste pass data';              
              data: any;
             error: any;
        dataSource: any;
          repassOp: RepassOp[]
  displayedColumns: string[] = [
                    'produzir',
                    'prioridade',
                    'dtPriori',
                    'destino',
                    'numOp',
                    'itCodigo',
                    'descItem',
                    'endereco',
                    'codLote',
                    'lance'];
         producao = true;
        impressao = false;
          loading = true;
             user = '';
            setor = null;
          repassa = null;
        monitorOP = null;
        expedicao = null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,      { static: true })      sort: MatSort;

  constructor( private     repService: RepassadeiraService,
               private monitorService: MonitoropService,
               private   loginService: LoginService,
               private          route: Router,
               public          dialog: MatDialog) {
                 this.dataSource = new MatTableDataSource(this.repassOp);
              }
  ngOnInit() {  
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loginService.currentUser.subscribe(       user => this.user = user );
    this.loginService.currentSetor.subscribe(     setor => this.setor = setor );
    this.loginService.currentRepassa.subscribe( repassa => this.repassa = repassa );
    this.loginService.currentMonitor.subscribe( monitor => this.monitorOP = monitor );
    this.loginService.currentExpedicao.subscribe( expedicao => this.expedicao = expedicao );

    console.log(this.user    + ' ' + this.setor     + ' ' + 
                this.repassa + ' ' + this.monitorOP + ' ' +
                this.expedicao);
    this.guardData();    
    this.getDataOp(this.setor);    
  }

  
  openDialog( opDOM,
              clienteDOM,
              codProdDOM,
              descProdDOM,
              dimBobDOM,
              bobMadDOM,
              loteDOM,
              lanceDOM,
              obsOpDOM,
              bobFinalDOM,
              podeVariarDOM,
              varMaxDOM,
              varMinDOM,
              qtdBobDOM,
              qtdRoloDOM,
              qtdRetalhoDOM,
              qtdSucataDOM,
              corteBobDOM,
              corteRoloDOM,
              corteRetDOM,
              corteSucDOM ): void {
    
    const dialogRef = this.dialog.open(FormRepComponent, {
      width: '1000px',      
      data: {    op: opDOM,
            cliente: clienteDOM,
            codProd: codProdDOM,
           descProd: descProdDOM,
             dimBob: dimBobDOM,
             bobMad: bobMadDOM,
               lote: loteDOM,
              lance: lanceDOM,
              obsOp: obsOpDOM,
           bobFinal: bobFinalDOM,
         podeVariar: podeVariarDOM,
             varMax: varMaxDOM,
             varMin: varMinDOM,
             qtdBob: qtdBobDOM,
            qtdRolo: qtdRoloDOM,
         qtdRetalho: qtdRetalhoDOM,
          qtdSucata: qtdSucataDOM,
           corteBob: corteBobDOM,
          corteRolo: corteRoloDOM,
           corteRet: corteRetDOM,
           corteSuc: corteSucDOM }
    });

    console.log( clienteDOM );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }


  produzir(){
    alert('Open');
  }

  menuControl(data) {
    console.log(data);
    if( data == 'prod' ) {
      this.producao  = true;
      this.impressao = false;
    } else if ( data == 'imp' ) {
      this.producao  = false;
      this.impressao = true;
    }
  }

  guardData(){
    if( this.user == 'NULL' || this.setor == 'NULL') {
      console.log('Get out')
      this.route.navigateByUrl('/');
    } else if ( this.repassa == 'no'  ) {
      console.log('sem acesso a repassa');
    }
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
                      let repOp = doc;
                      repOp = repOp['Root'];
                      if(repOp == undefined){
                        console.log('Database is Out');
                      } else {
                        repOp = repOp['ttOp'];
                        repOp = repOp['Registro'];
                        console.log(repOp);
                        this.dataSource.data = repOp;
                        this.loading = false;
                      }
                    }, error => this.error = console.log('This ' + error) );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if( this.dataSource.paginator ) {
      this.dataSource.paginator.firstPage();
    }
  }

} // The end

