import { Component, OnInit, ViewChild, 
         ViewEncapsulation            } from '@angular/core';
import { RepassadeiraService          } from './repassadeira.service';
import { MonitoropService             } from '../monitorop/monitorop.service';
import { LoginService                 } from '../login/login.service';
import { map                          } from 'rxjs/operators';
import { MatPaginator                 } from '@angular/material/paginator';
import { MatSort                      } from '@angular/material/sort';
import { MatTableDataSource           } from '@angular/material/table';
import { RepassOp                     } from './repassOp';
import { Router                       } from '@angular/router';
import { MatDialog                    } from '@angular/material/dialog';
import { FormRepComponent             } from './form-rep/form-rep.component';
import { MatSnackBar                  } from '@angular/material';
import { Inject                       } from '@angular/core';
import { MatDialogRef, 
         MAT_DIALOG_DATA              } from '@angular/material/dialog';
import { SelectRepComponent           } from './select-rep/select-rep.component';
        
@Component({
     selector: 'app-repassadeira',
  templateUrl: './repassadeira.component.html',
    styleUrls: ['./repassadeira.component.scss'],
encapsulation: ViewEncapsulation.None
})
export class RepassadeiraComponent implements OnInit {
  
  selectedRepass: number;  
           error: any;
      dataSource: any;
     repSelected: false;
        repassOp: RepassOp[]
displayedColumns: string[] = ['produzir',
                              'prioridade',
                              'dtPriori',
                              'destino',
                              'numOp',
                              'itCodigo',
                              'descItem',
                              'endereco',
                              'codLote',
                              'lance'];

  blockRepassa = true;                              
  producao     = true;
  impressao    = false;
  loading      = true;
  user         = '';
  setor        = null;
  repassa      = null;
  monitorOP    = null;
  expedicao    = null;
  saved        = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public        snackBar: MatSnackBar,
    private     repService: RepassadeiraService,
    private monitorService: MonitoropService,
    private   loginService: LoginService,
    private          route: Router,
    public          dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.repassOp);
  }
  ngOnInit() {    
  }

  startAll(){
    if( this.selectedRepass == null ){
      this.saveSelectedRepass();
      this.blockRepassa = false;          
    } else {
      this.blockRepassa = true;      
    }    
  }

  saveSelectedRepass(): void {
    const dialogSelect = this.dialog.open(SelectRepComponent, {
      width: '350px',
      height: '250px',
      data: { selectedRepass: this.selectedRepass }
    });

    dialogSelect.afterClosed().subscribe( result => { 
      console.log( 'result: ' + result ); 
      this.selectedRepass = result;
      console.log(this.selectedRepass)
      if( result != null || result != undefined ){
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loginService.currentUser.subscribe(user           => this.user      = user);
        this.loginService.currentSetor.subscribe(setor         => this.setor     = setor);    
        this.loginService.currentMonitor.subscribe(monitor     => this.monitorOP = monitor);
        this.loginService.currentExpedicao.subscribe(expedicao => this.expedicao = expedicao);
        this.repassa = this.setor
        console.log( 'inside repassadeiras' + this.user + ' ' + 
                                 this.setor + ' ' + this.repassa + ' ' + 
                                 this.monitorOP + ' ' + this.expedicao);
        this.guardData();
        this.getDataOp(this.setor);
      } else {
        this.saveSelectedRepass();
      }
    });
  }

  openDialog(opDOM,
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
             corteSucDOM,
             sparkDOM,
             amostraDOM,
             mmValidaDOM,
             mPontaForaDOM,
             corteRolDOM,
             quantEtqDOM,
             codImpDOM,
             codProblemaDOM,
             codProbSucDOM,
             numOpPendDOM,
             taraDOM): void {    

    if( bobFinalDOM == "Sim" && numOpPendDOM != ' ' ) {
      alert( '🚨 EXISTEM LANCES DAS OP`s:' + numOpPendDOM + ' PARA SEREM PRODUZIDOS DESSE LOTE. VERIFIQUE ❗' )
    }
              
    if( mmValidaDOM == 0 ) {
      const dialogRef = this.dialog.open(FormRepComponent, {
        width: '1050px',        
         data: {
           op: opDOM,
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
     corteSuc: corteSucDOM,
        spark: sparkDOM,
      amostra: amostraDOM,
     mmValida: mmValidaDOM,
   mPontaFora: mPontaForaDOM,
     corteRol: corteRolDOM,
     quantEtq: quantEtqDOM,
       codImp: codImpDOM,
  codProblema: codProblemaDOM,
   codProbSuc: codProbSucDOM,
        saved: this.saved,
    numOpPend: numOpPendDOM,
         tara: taraDOM }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed' + this.saved);
        console.log(result);
        if(result == true){
          this.getDataOp(this.setor);
        }

      });

    } else if( mmValidaDOM == 1 ) {      
      this.snackBar.open('Esta bobina não pode ser repassada pois o metro a metro não foi validado.' +
                         'Solicite ao recebimento para validar o metro a metro da bobina.' + ',' + 
                         'ERRO METRO A METRO', '[X]Fechar', {           
          duration: 10000
      });
    } else if( mmValidaDOM == 5 ) {
      let insertDOM = prompt( 'Informe a ponta de fora:');
      let corteRolLocal = corteRolDOM;
      corteRolLocal = corteRolLocal.split(",");                  
      if( insertDOM == mPontaForaDOM  ) {        
        const dialogRef = this.dialog.open(FormRepComponent, {
          width: '1050px',
           data: {
             op: opDOM,
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
       corteSuc: corteSucDOM,
          spark: sparkDOM,
        amostra: amostraDOM,
       mmValida: mmValidaDOM,
     mPontaFora: mPontaForaDOM,
       corteRol: corteRolLocal,
       quantEtq: quantEtqDOM,
         codImp: codImpDOM,
    codProblema: codProblemaDOM,
     codProbSuc: codProbSucDOM,
          saved: this.saved,
      numOpPend: numOpPendDOM,
           tara: taraDOM }
        });  
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed' + this.saved);
        console.log(result);
        if(result == true){
          this.getDataOp(this.setor);
        }
        });
      } else {
        this.snackBar.open('Ponta de fora não confere.', '[X]Fechar', {           
          duration: 3000
        });
      }
    }
    console.log(clienteDOM); 
  }

  menuControl(data) {
    console.log(data);
    if (data == 'prod') {
      this.producao  = true;
      this.impressao = false;
    } else if (data == 'imp') {
      this.producao  = false;
      this.impressao = true;
    }
  }

  guardData() {
    if (this.user == 'NULL' || this.setor == 'NULL') {
      console.log('Get out')
      this.route.navigateByUrl('/');
    } else if (this.repassa == 'no') {
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
        if (repOp == undefined) {
          this.snackBar.open('Base de dados Off-line ❗', '[x] Fechar', { duration: 5000});
        } else {
          repOp = repOp['ttOp'];
          repOp = repOp['Registro'];          
          console.log(repOp);
          this.dataSource.data = repOp;
          this.loading = false;
          
        }
      }, error => this.error = console.log('This ' + error));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

} 








