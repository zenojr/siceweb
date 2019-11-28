import { Component, OnInit,
         ViewChild           } from '@angular/core';
import { RepassadeiraService } from './repassadeira.service';
import { MonitoropService    } from '../monitorop/monitorop.service';
import { LoginService        } from '../login/login.service';
import { map                 } from 'rxjs/operators';
import { MatPaginator        } from '@angular/material/paginator';
import { MatSort             } from '@angular/material/sort';
import { MatTableDataSource  } from '@angular/material/table';
import { RepassOp            } from './repassOp';

@Component({
  selector: 'app-repassadeira',
  templateUrl: './repassadeira.component.html',
  styleUrls: ['./repassadeira.component.scss']
})
export class RepassadeiraComponent implements OnInit {
              data: any;
             error: any;
          repassOp: RepassOp[]
        dataSource: any;
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
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,      { static: true })      sort: MatSort;
  
  user      = '';
  setor     = null;
  repassa   = null;
  monitorOP = null;
  expedicao = null;

  constructor( private     repService: RepassadeiraService,
               private monitorService: MonitoropService,
               private   loginService: LoginService ) {
                 this.dataSource = new MatTableDataSource(this.repassOp);
              }
  ngOnInit() {  
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.loginService.currentUser.subscribe( user => this.user = user );
    this.loginService.currentSetor.subscribe( setor => this.setor = setor );
    this.loginService.currentRepassa.subscribe( repassa => this.repassa = repassa );
    this.loginService.currentMonitor.subscribe( monitor => this.monitorOP = monitor );
    this.loginService.currentExpedicao.subscribe( expedicao => this.expedicao = expedicao );

    console.log(this.user    + ' ' + this.setor     + ' ' + 
                this.repassa + ' ' + this.monitorOP + ' ' +
                this.expedicao);

    setTimeout(() => {
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
                      let repOp = doc;
                      repOp = repOp['Root'];
                      if(repOp == undefined){
                        console.log('Database is Out');
                      } else {
                        repOp = repOp['ttOp'];
                        repOp = repOp['Registro'];
                        console.log(repOp);
                        this.dataSource.data = repOp;
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
