import { Component, OnInit, Inject     } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData                    } from '../repFormModel';
import { MatSnackBar                   } from '@angular/material/snack-bar';
import { DataRepOut                    } from './saveDataModel';
import { LoginService                  } from '../../login/login.service';
import { HttpClient                    } from '@angular/common/http';
import { RepassadeiraService           } from '../repassadeira.service';
import { FormControl, Validators       } from '@angular/forms';
import { MonitoropService              } from '../../monitorop/monitorop.service'

@Component({
     selector: 'app-form-rep',
  templateUrl: './form-rep.component.html',
    styleUrls: ['./form-rep.component.scss']
})
export class FormRepComponent implements OnInit {
  
  // inputBob = new FormControl('', [Validators.required]);
 
  errorSaving   = []
  testeSpark    = '';
  devProd       = '';
  user          = '';
  obsRepass     = '';
  quantMetro    = 0;
  quantRolo     = 0;
  quantRet      = 0;
  quantSuc      = 0;
  indexCorteRol = 0;
  taraOut       = 0;
  motDevSelect  = null;
  arrSave       = [];
  blockRol      = false;
  blockBob      = false;
  blockRolo     = false;
  blockRetalho  = false;
  blockSucata   = false;
  blockDevolver = false;
  motDevolucao: any;
         error: any;
  repassadeira: any;
  constructor(
    public   repassForm: MatDialogRef<FormRepComponent>,
    public     snackBar: MatSnackBar,
    public loginService: LoginService,
    public         http: HttpClient,
    public      repServ: RepassadeiraService,
    public    monOpServ: MonitoropService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    @Inject(MAT_DIALOG_DATA) public dataRepOut: DataRepOut
  ) { }

  ngOnInit() {
    this.loginService.currentUser.subscribe( user => this.user = user );    
    this.loginService.currentSetor.subscribe( repassa => this.repassadeira = repassa.slice(13));
    console.log( 'inside form' +  this.data.saved);  
    this.getErrorMessage();
  }

  getMotDevolucao() {
    const url = 'http://192.168.0.7:8080/cgi-bin/wspd_cgi.sh/WService=emswebelttst/scb013ws.p?tipo=devolucao';
    this.http.get( url, {responseType: 'text'} ).subscribe( response => {      
      this.motDevolucao = this.monOpServ.convertXMLtoJSON(response);
      this.motDevolucao = this.motDevolucao['Root'];
      this.motDevolucao = this.motDevolucao['ttProblema'];
      this.motDevolucao = this.motDevolucao['Registro'];
      
      console.log(this.motDevolucao);

    });
  }

  getErrorMessage(){
    if( this.data['qtdBob'] != 0 ){      
      // this.inputBob.hasError('required') ? 'Você deve informar um valor' : '';      
    }     
  }

  saveFormData(bobinaProd,
               roloProd,
               retalhoProd,
               sucataProd,
               obsRepassadeira){

  let Observ      = '';
  let numOp       = this.data['op'];
  let itCodigo    = this.data['codProd'];
  let codLote     = this.data['lote'];
  let lance       = this.data['lance'];
  let tara        = this.taraOut;
  let ajSpark     = this.data['spark'];
  let destino     = this.data['cliente'];
  let usuario     = this.user;
  let numRepassa  = this.repassadeira;
  this.quantMetro = bobinaProd;
  this.quantRolo  = roloProd;
  this.quantRet   = retalhoProd;
  this.quantSuc   = sucataProd;
  let DevProd     = this.devProd;
  Observ          = obsRepassadeira;
  let codImp      = this.data['codImp'];
  let codProblema = this.data['codProblema'];
  let codProbSuc  = this.data['codProbSuc'];

  
  this.errorSaving = [];

  if( this.devProd === 'devolver' && this.motDevSelect == null || this.motDevSelect == 0){
      // this.errorSaving.pop();
      this.errorSaving.push('Selecione um motivo de devolução');
      this.blockDevolver = true;
      alert('block here')
  } else {
      this.blockDevolver = false;
  }

  if( this.data['qtdSucata'] > 0){
      // this.errorSaving.pop();
      this.errorSaving.push('Informe a produção de sucata');
      this.blockRetalho = true;
  } else {
      this.blockRetalho = false;
  }

  if( this.data['qtdRetalho'] > 0 ) {
      // this.errorSaving.pop();
      this.errorSaving.push('Informe a produção de Retalho');
      this.blockRetalho = true;
  } else {
      this.blockRetalho = false
  }

  if( this.data['qtdRolo'] > 0 ){
    // this.errorSaving.pop();
    this.errorSaving.push( 'Informe a produção de Rolo' );
    this.blockRolo = true;
  } else {
    this.blockRolo = false;
  }
  
  if( this.data['qtdBob'] > 0 && this.quantMetro == 0){
    // this.errorSaving.pop();
    this.errorSaving.push( 'Informe a produção de bobina' );
    this.blockBob = true;    
  } else {
    this.blockBob = false;
  }

  if(this.data['corteRol'].length > 1 ) {
    this.blockRol = true;
    this.errorSaving.push( '🚨 Você deve deve confirmar todos os cortes de rolo para salvar a produção.' )
  }

  if( this.quantRolo > 5){
    this.errorSaving.push( '🚨 A quantidade de rolos produzido ultrapassa o limite permitido ' );
  }

  if( this.data['qtdRolo'] == 0 && this.quantRolo > 2 ){
    this.errorSaving.push( '🚨 Não foi solicitado produção de rolos e o valor informado é maior que o permitido.' );
  }

  if( this.testeSpark != 'sim' ){
      this.snackBar.open('🚨 Teste Spark não realizado ❕', '[x]Fechar', {           
        duration: 3000
      });      
  } else {
    const url = 'http://192.168.0.7:8080/cgi-bin/wspd_cgi.sh/WService=emswebelttst/scb005ws.p';
    let bigStringOut = '';  
        bigStringOut = url + '?' + 
                   'numOp='      + numOp           + '&' +
                   'itCodigo='   + itCodigo        + '&' +
                   'codLote='    + codLote         + '&' + 
                   'lance='      + lance           + '&' +
                   'tara='       + tara            + '&' +
                   'ajSpark='    + ajSpark         + '&' +
                   'destino='    + destino         + '&' +
                   'usuario='    + usuario         + '&' +
                   'numRepassa=' + numRepassa      + '&' +
                   'quantMetro=' + this.quantMetro + '&' +
                   'quantRolo='  + this.quantRolo  + '&' +
                   'quantRet='   + this.quantRet   + '&' +
                   'quantSuc='   + this.quantSuc   + '&' +
                   'DevProd='    + DevProd         + '&' +
                   'Observ='     + Observ          + '&' +
                   'codImp='     + codImp          + '&' +
                   'codProblema='+ codProblema     + '&' +
                   'codProbSuc=' + codProbSuc;

    if(this.errorSaving.length < 1) {
      this.http.get( bigStringOut, {responseType: 'text'} )
      .subscribe( response => {      
        console.log( 'Data_Recieved: ' + response );
        
          this.snackBar.open('O.P Salva com sucesso.', '[X]Fechar', {           
            duration: 3000
          });    
          this.data.saved = true;
          this.closeRepForm();
        
      }, error =>  this.error = console.log(error));
    } else {
      this.snackBar.open('ERRO: ' + this.errorSaving , '[X]Fechar', {
        duration: 8000
      });
    }
  }
 }

  closeRepForm(): void {
    this.repassForm.close(this.data.saved);
  }

  nextBtn(){
    console.log( this.data['corteRol'] );
    let controlStop = this.data['corteRol'];
    if( this.indexCorteRol < controlStop.length -1 ){
      this.indexCorteRol++;
      this.blockRol = true
    } else {
      this.blockRol = false;
      this.snackBar.open('Corte rolo finalizado.', '[X]Fechar', {
        duration: 3000
      });
      return this.indexCorteRol;
    }
  }
}
