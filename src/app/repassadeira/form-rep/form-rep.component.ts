import { Component, OnInit, Inject, 
         ViewChild, ElementRef         } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,
         MatDialog                     } from '@angular/material';
import { DialogData                    } from '../repFormModel';
import { MatSnackBar                   } from '@angular/material/snack-bar';
import { DataRepOut                    } from './saveDataModel';
import { LoginService                  } from '../../login/login.service';
import { HttpClient                    } from '@angular/common/http';
import { RepassadeiraService           } from '../repassadeira.service';
import { MonitoropService              } from '../../monitorop/monitorop.service';

export interface LoginSup {
  usuario: string;
    senha: string;
motSucata: any;
}

@Component({
     selector: 'app-form-rep',
  templateUrl: './form-rep.component.html',
    styleUrls: ['./form-rep.component.scss']
})
export class FormRepComponent implements OnInit {

  usuario       = null;
  senha         = null;
  devProd       = null;
  motDevSelect  = null;
  errorSaving   = [];
  arrSave       = [];
  arrayMotivoSuc= [];
  testeSpark    = '';
  user          = '';
  obsRepass     = '';
  quantMetro    = 0;
  quantRolo     = 0;
  quantRet      = 0;
  quantSuc      = 0;
  indexCorteRol = 0;
  taraOut       = 0;
  blockRol      = false;
  blockBob      = false;
  blockRolo     = false;
  blockRetalho  = false;
  blockSucata   = false;
  blockDevolver = false;
  blockTara     = false;
  callSupervi   = false;
  motDevolucao: any;
     motSucata: any;
         error: any;
  repassadeira: any;
       motivos: any;
     motivoOut: any;

  constructor(
    public  dialogLogin: MatDialog,
    public   repassForm: MatDialogRef<FormRepComponent>,
    public     snackBar: MatSnackBar,
    public loginService: LoginService,
    public         http: HttpClient,
    public      repServ: RepassadeiraService,
    public    monOpServ: MonitoropService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    @Inject(MAT_DIALOG_DATA) public dataRepOut: DataRepOut
  ) {}

  ngOnInit() {
    this.loginService.currentUser.subscribe( user => this.user = user );
    this.loginService.currentSetor.subscribe( repassa => this.repassadeira = repassa.slice(13));
    console.log( 'inside form' +  this.data.saved);
    this.getMotDevolucao('sucata');
  }

  @ViewChild('sucataProd', {static:true}) fieldInputSucata: ElementRef;
  
  openLoginSup(): void {
    
    this.motivos = this.motSucata;
    console.log(this.motivos);
    if( this.usuario === null && this.senha === null || this.usuario === '' && this.senha === '' ){
      const dialogLogin = this.dialogLogin.open( DialogLoginSup, {
        width: '250px',
        data: { 
        usuario: this.usuario,
          senha: this.senha,
      motSucata: this.motivos
        }
      });
      dialogLogin.afterClosed().subscribe( res => {
        if(res === undefined || res === null || res === '' ){
          // this.openLoginSup();
          this.fieldInputSucata.nativeElement.value = null;
        }
        console.log('Login Sup');
        if( res[0].length >= 3 && res[1].length >= 3 ) {
          this.usuario   = res[0];
          this.senha     = res[1];
          this.motSucata = res[2];
          console.log( 'user: ' + this.usuario + ' ' + 'senha: ' + this.senha + ' ' + 'motivo:' + this.motSucata);
        }else{
          this.fieldInputSucata.nativeElement.value = null;
          this.usuario = null;
          this.senha  = null;
          alert('Insira um usuário e senha inválidos');
        }
      });
    } 
    this.callSupervi = true;
  }

  getMotDevolucao(tipo) {
    if( tipo === 'devolucao' ){
      const url = 'http://192.168.0.7:8080/cgi-bin/wspd_cgi.sh/WService=emswebelttst/scb013ws.p?tipo=' + tipo;
      this.http.get( url, {responseType: 'text'} ).subscribe( response => {
        this.motDevolucao = this.monOpServ.convertXMLtoJSON(response);
        this.motDevolucao = this.motDevolucao['Root'];
        this.motDevolucao = this.motDevolucao['ttProblema'];
        this.motDevolucao = this.motDevolucao['Registro'];
        // console.log(this.motDevolucao);
      });
    } else if( tipo === 'sucata' ){
      const url = 'http://192.168.0.7:8080/cgi-bin/wspd_cgi.sh/WService=emswebelttst/scb013ws.p?tipo=' + tipo;
      this.http.get( url, {responseType: 'text'} ).subscribe( response => {
        this.motSucata = this.monOpServ.convertXMLtoJSON(response);
        this.motSucata = this.motSucata['Root'];
        this.motSucata = this.motSucata['ttProblema'];
        this.motSucata = this.motSucata['Registro'];
        // console.log(this.motSucata);
        return this.motSucata;
    });
    }
  }

  validateSucata( sucataProd ) {
    if(sucataProd > this.data['qtdSucata'] && this.usuario === null && this.senha === null){
      this.openLoginSup();
    } else {
      console.log('do nothing!!!!!');
      this.callSupervi = true;
    }
  }

  

  clearLoginSup(){
    this.usuario = null;
    this.senha = null;
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

  if( sucataProd > this.data['qtdSucata'] ) {
        this.openLoginSup();
  }

  if( this.data['dimBob'].slice(0,4) == 'ERRO' ){
      this.errorSaving.push('Erro na Dimensão da Bobina, peça para o supervisor verificar cadastro de limite no SCB: ' + this.data['dimBob']);
  }

  if( this.devProd === null ){
      this.errorSaving.push('Selecione uma opção: Devolver ou Produzir 🚨');
  }

  if( this.devProd === 'devolucao' && this.motDevSelect == null || this.motDevSelect == 0){
      this.errorSaving.push('Selecione um motivo de devolução 🚨');
      this.blockDevolver = true;
  } else {
      this.blockDevolver = false;
  }

  if( this.data['qtdSucata'] > 0 && sucataProd == 0 || sucataProd == null ){
      this.errorSaving.push('Informe a produção de sucata 🚨');
      this.blockSucata = true;
  } else {
      this.blockSucata = false;
  }

  if( this.data['qtdRetalho'] > 0 && retalhoProd == 0 || retalhoProd == null ){
      this.errorSaving.push('Informe a produção de Retalho 🚨');
      this.blockRetalho = true;
  } else {
      this.blockRetalho = false
  }

  if( this.data['qtdRolo'] > 0 && roloProd == 0 || roloProd == null ){
      this.errorSaving.push( 'Informe a produção de Rolo 🚨');
      this.blockRolo = true;
  } else {
      this.blockRolo = false;
  }
  
  if( this.data['dimBob'] != 'ROLO' ){
    if( this.taraOut == 0 || this.taraOut == null  ){
      this.errorSaving.push( 'Informe a tara! 🚨' );
      this.blockTara = true;
    } else {
      this.blockTara = false;
    }
  }

  if( this.data['qtdBob'] > 0 && bobinaProd == 0 || bobinaProd == null ){
    this.errorSaving.push( 'Informe a produção de bobina 🚨');
    this.blockBob = true;    
  } else {
    this.blockBob = false;
  }

  if(this.data['corteRol'].length > 1 && this.blockRol ){
    console.log(this.data['corteRol']);
    this.blockRol = true;
    this.errorSaving.push( 'Você deve deve confirmar todos os cortes de rolo para salvar a produção 🚨')
  }

  if( this.quantRolo > this.data['qtdRolo'] + 2){
    this.errorSaving.push( 'A quantidade de rolos produzido ultrapassa o limite permitido 🚨' );
  }

  if( this.data['qtdRolo'] == 0 && this.quantRolo > 2 ){
    this.errorSaving.push( 'Não foi solicitado produção de rolos e o valor informado é maior que o permitido 🚨' );
  }

  if( this.testeSpark != 'sim'){
    this.errorSaving.push('Teste Spark não realizado ❕');
  }

  if( this.errorSaving.length < 1 ){
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
      this.http.get( bigStringOut, {responseType: 'text'})
      .subscribe( response => {      
        console.log( 'Data_Recieved: ' + response );
          this.snackBar.open('O.P Salva com sucesso.', '[X]Fechar',{
            duration: 3000
          });    
          this.data.saved = true;
          this.closeRepForm();
        
      }, error =>  this.error = console.log(error));
    
  } else if( this.errorSaving.length > 0 ) {
    this.snackBar.open('ERRO: ' + this.errorSaving , '[X]Fechar',{
      duration: 8000
    });
  }
 }

  closeRepForm(): void {
    this.repassForm.close(this.data.saved);
  }

  nextBtn(){    
    let controlStop = this.data['corteRol'];
    console.log( 'The index:' + this.indexCorteRol + 'The controler: ' + controlStop.length);
    if( this.indexCorteRol < controlStop.length -1 ){
      this.indexCorteRol++;
      this.blockRol = true
    } else {
      this.blockRol = false;
      this.snackBar.open('Corte rolo finalizado.', '[X]Fechar',{
        duration: 3000
      });
      return this.indexCorteRol;
    }
  }
}


@Component({
     selector: 'dialogLoginSup',
  templateUrl: './dialogLoginSup.html',
    styleUrls: ['./form-rep.component.scss']
})
export class DialogLoginSup {
  
  constructor(
    public dialogRef: MatDialogRef<DialogLoginSup>,
    @Inject(MAT_DIALOG_DATA) public data: LoginSup) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveDataLogin(user, pass, motivo){
    console.log(motivo);
    let arrDataSup = [];
    this.data.usuario = user;
    this.data.senha = pass;
    this.data.motSucata = motivo;
    arrDataSup.push(user);
    arrDataSup.push(pass);
    arrDataSup.push(motivo);
    this.dialogRef.close( arrDataSup );
  }

  closeSupForm():void {
    this.dialogRef.close();
  }

}