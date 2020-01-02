import { Component, OnInit, Inject     } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData                    } from '../repFormModel';
import { MatSnackBar                   } from '@angular/material/snack-bar';
import { DataRepOut                    } from './saveDataModel';
import { LoginService                  } from '../../login/login.service';

@Component({
  selector: 'app-form-rep',
  templateUrl: './form-rep.component.html',
  styleUrls: ['./form-rep.component.scss']
})
export class FormRepComponent implements OnInit {
  indexCorteRol = 0;
     testeSpark = '';
        devProd = '';
           user = '';
        arrSave = [];
       error: any;
repassadeira: any;
     taraOut: number;
  constructor(
    public repassForm: MatDialogRef<FormRepComponent>,
    public   snackBar: MatSnackBar,
    public loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    @Inject(MAT_DIALOG_DATA) public dataRepOut: DataRepOut
  ) { }

  ngOnInit() {
    console.log(this.data['mmValida'] );
    this.loginService.currentUser.subscribe( user => this.user = user );
    // this.loginService.currentRepassa.subscribe( repassa => this.repassadeira = repassa );
    this.loginService.currentSetor.subscribe( repassa => this.repassadeira = repassa.slice(13));
    console.log( 'inside form' +  this.repassadeira);
  }

  saveFormData(op,
               cliente,
               codProd,
               descProd,
               dimBob,
               bobMad,
               lote,
               lance,
               obsOp,
               bobFinal,
               podeVariar,
               varMax,
               varMin,
               qtdBob,
               qtdRolo,
               qtdRetalho,
               qtdSucata,
               bobinaProd,
               roloProd,
               retalhoProd,
               sucataProd,
               obsRepassadeira,
               spark,
               amostra){
         
  let corteBob = this.data['corteBob'];
  let corteRol = this.data['corteRol'];
      corteRol = corteRol[corteRol.length -1];
  let corteRet = this.data['corteRet'];
  let corteSuc = this.data['corteSuc'];
  let quantEtq = this.data['quantEtq'];
  let codImp   = this.data['codImp'];
  let codProblema = this.data['codProblema'];
  let codProbSuc = this.data['codProbSuc'];
  console.log( 'here is' + this.data['spark'] );
  console.log( 'let in' + op, cliente, codProd, descProd, dimBob, bobMad, lote, lance, obsOp, bobFinal, 
               podeVariar, varMax, varMin, qtdBob, qtdRolo, qtdRetalho, qtdSucata, corteBob,
               corteRol,corteRet,corteSuc, bobinaProd, roloProd, retalhoProd, 
               sucataProd, this.taraOut, spark, obsRepassadeira, amostra, codProbSuc );
  this.dataRepOut = {
      numOp: op,
   itCodigo: codProd,
    codLote: lote,
      lance: lance,
       tara: this.taraOut,
    ajSpark: spark,
    destino: cliente,
    usuario: this.user,
 numRepassa: this.repassadeira,
 quantMetro: quantEtq,
  quantRolo: qtdRolo,
   quantRet: qtdRetalho,
   quantSuc: qtdSucata,
    DevProd: this.devProd,
     Observ: obsRepassadeira,
     codImp: codImp,
codProblema: codProblema,
 codProbSuc: codProbSuc     
  }               

  console.log( this.dataRepOut );
  const dataOut = this.dataRepOut;
  const url = 'http://192.168.0.7:8080/cgi-bin/wspd_cgi.sh/WService=emswebelttst/scb005ws.p';
  let bigStringOut = '';
  console.log(dataOut);
  bigStringOut = url + '?'     + 
                 'numOp='      + dataOut['numOp']      + '&' +
                 'itCodigo='   + dataOut['itCodigo']   + '&' +
                 'codLote='    + dataOut['codLote']    + '&' + 
                 'lance='      + dataOut['lance']      + '&' +
                 'tara='       + dataOut['tara']       + '&' +
                 'ajSpark='    + dataOut['ajSpark']    + '&' +
                 'destino='    + dataOut['destino']    + '&' +
                 'usuario='    + dataOut['usuario']    + '&' +
                 'numRepassa=' + dataOut['numRepassa'] + '&' +
                 'quantMetro=' + dataOut['quantMetro'] + '&' +
                 'quantRolo='  + dataOut['quantRolo']  + '&' +
                 'quantRet='   + dataOut['quantRet']   + '&' +
                 'quantSuc='   + dataOut['quantSuc']   + '&' +
                 'DevProd='    + dataOut['DevProd']    + '&' +
                 'Observ='     + dataOut['Observ']     + '&' +
                 'codImp='     + dataOut['codImp']     + '&' +
                 'codProblema='+ dataOut['codProblema']+ '&' +
                 'codProbSuc=' + dataOut['codProbSuc'];

  console.log(bigStringOut);
  // numOp=575131
  // itCodigo=CMA0504NAZ-ALI
  // codLote=709062703BD
  // lance=2
  // tara=undefined
  // ajSpark=
  // destino=FEHRMANN COM ATAC IMPORTACAO 
  //  EXPORT LTDA
  // usuario=ZENO
  // numRepassa=4
  // quantMetro=500
  // quantRolo=0
  // quantRet=0
  // quantSuc=0
  // DevProd=
  // Observ=12,5
  // codImp=0
  // codProblema=0
  // codProbSuc=0

  }

  // sendRepassadeiras() {
  //   if( this.arrOut == null ){
  //     this.snackBar.open('Nenhum produto selecionado.', '[X] Fechar', { duration: 5000});
  //   } else {
  //     this.sending = true;
  //     const recebe = this.arrOut;
  //     const url = 'http://192.168.0.7:8080/cgi-bin/wspd_cgi.sh/WService=emswebelttst/scb002wsV2.p';
  //     let bigStringOut = '';
  //     recebe.forEach( data => {
  //       const bigString = data.dtOp         + ',' +
  //                         data.numOp        + ',' +
  //                         data.repassadeira + ',' +
  //                         data.seqItem      + ',' + 
  //                         data.destino      + ';';
  //       bigStringOut += bigString;
  //   });
  //   console.log(bigStringOut);
  //   this.http.get( url + '?recebe=' + bigStringOut, { responseType: 'text' } )
  //   .subscribe(doc => {
  //     console.log(' Data Send ' + doc )
  //     if( doc == 'OK' ) {        
  //       this.arrOut = [];
  //       this.getTableOP();        
  //     } else {
  //       this.snackBar.open('Erro ao gravar dados', '[X] Fechar', { duration: 5000 });
  //       setTimeout( () => {
  //         location.reload();          
  //       }, 5000 );        
  //     }
  //   }, error => this.error = console.log(error)); 
  //   }    
  // }

  onNoClick(): void {
    this.repassForm.close();
  }

  nextBtn(){
    let controlStop = this.data['corteRol'];    
    if( this.indexCorteRol < controlStop.length -1 ){
      this.indexCorteRol++;
      console.log( 'indexControlInside' + this.indexCorteRol);
    } else {
      this.snackBar.open('Corte rolo finalizado.', '[X]Fechar', {           
        duration: 3000
      });      
      return this.indexCorteRol;
    }    
  }
}
