import { Component, OnInit, Inject     } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData                    } from '../repFormModel';
import { MatSnackBar                   } from '@angular/material/snack-bar';
import { DataRepOut                    } from './saveDataModel';
import { LoginService                  } from '../../login/login.service';
import { HttpClient                    } from '@angular/common/http';
import { RepassadeiraService           } from '../repassadeira.service';

@Component({
     selector: 'app-form-rep',
  templateUrl: './form-rep.component.html',
    styleUrls: ['./form-rep.component.scss']
})
export class FormRepComponent implements OnInit {
  testeSpark    = '';
  devProd       = '';
  user          = '';
  obsRepass     = '';
  indexCorteRol = 0;
  bobina        = 0;
  taraOut       = 0;
  arrSave       = [];
         error: any;
  repassadeira: any;
  constructor(
    public   repassForm: MatDialogRef<FormRepComponent>,
    public     snackBar: MatSnackBar,
    public loginService: LoginService,
    public         http: HttpClient,
    public      repServ: RepassadeiraService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    @Inject(MAT_DIALOG_DATA) public dataRepOut: DataRepOut
  ) { }

  ngOnInit() {    
    this.loginService.currentUser.subscribe( user => this.user = user );    
    this.loginService.currentSetor.subscribe( repassa => this.repassadeira = repassa.slice(13));
    console.log( 'inside form' +  this.data.saved);     
  }

  saveFormData(bobinaProd,
               roloProd,
               retalhoProd,
               sucataProd,
               obsRepassadeira){

  let erroSaving  = [];                
  let quantMetro  = 0;
  let quantRolo   = 0;
  let quantRet    = 0;
  let quantSuc    = 0;
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
  quantMetro      = bobinaProd;
  quantRolo       = roloProd;
  quantRet        = retalhoProd;
  quantSuc        = sucataProd;
  let DevProd     = this.devProd;
  Observ          = obsRepassadeira;
  let codImp      = this.data['codImp'];
  let codProblema = this.data['codProblema'];
  let codProbSuc  = this.data['codProbSuc'];

  console.log( this.data['corteRol'] );

  if( quantRolo > 5){
    erroSaving.push( '🚨 A quantidade de rolos produzido ultrapassa o limite permitido - ' );
  }

  if( this.data['qtdRolo'] == 0 && quantRolo > 2 ){
    erroSaving.push( '🚨 Não foi solicitado produção de rolos e o valor informado é maior que o permitido.' );
  }

  if( this.testeSpark != 'sim' ){
      this.snackBar.open('🚨 Teste Spark não realizado ❕', '[X]Fechar', {           
      duration: 3000
    });      
  } else {
    const url = 'http://192.168.0.7:8080/cgi-bin/wspd_cgi.sh/WService=emswebelttst/scb005ws.p';
    let bigStringOut = '';  
        bigStringOut = url + '?' + 
                   'numOp='      + numOp      + '&' +
                   'itCodigo='   + itCodigo   + '&' +
                   'codLote='    + codLote    + '&' + 
                   'lance='      + lance      + '&' +
                   'tara='       + tara       + '&' +
                   'ajSpark='    + ajSpark    + '&' +
                   'destino='    + destino    + '&' +
                   'usuario='    + usuario    + '&' +
                   'numRepassa=' + numRepassa + '&' +
                   'quantMetro=' + quantMetro + '&' +
                   'quantRolo='  + quantRolo  + '&' +
                   'quantRet='   + quantRet   + '&' +
                   'quantSuc='   + quantSuc   + '&' +
                   'DevProd='    + DevProd    + '&' +
                   'Observ='     + Observ     + '&' +
                   'codImp='     + codImp     + '&' +
                   'codProblema='+ codProblema+ '&' +
                   'codProbSuc=' + codProbSuc;

    if(erroSaving.length < 1) {
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
      this.snackBar.open('ERRO: ' + erroSaving , '[X]Fechar', {           
        duration: 8000
      });      
    }
                   
  }
 }

  closeRepForm(): void {    
    this.repassForm.close(this.data.saved);    
  }

  nextBtn(){
    let controlStop = this.data['corteRol'];    
    if( this.indexCorteRol < controlStop.length -1 ){
      this.indexCorteRol++;      
    } else {
      this.snackBar.open('Corte rolo finalizado.', '[X]Fechar', {           
        duration: 3000
      });      
      return this.indexCorteRol;
    }    
  }
}
