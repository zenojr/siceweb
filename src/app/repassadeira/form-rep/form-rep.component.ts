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
         bobina = 0;
        arrSave = [];
       error: any;
repassadeira: any;
     taraOut: number;
   obsRepass: string;
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

 saveFormData(){
  let numOp       = this.data['op'];
  let itCodigo    = this.data['codProd'];
  let codLote     = this.data['lote']
  let lance       =  this.data['lance']
  let tara        =  this.taraOut;
  let ajSpark     =  this.data['spark']
  let destino     = this.data['cliente']
  let usuario     = this.user;
  let numRepassa  =  this.repassadeira;
  let quantMetro  =  this.data['quantEtq']
  let quantRolo   =  this.data['qtdRolo']
  let quantRet    =  this.data['qtdRetalho']
  let quantSuc    =  this.data['qtdSucata']
  let DevProd     = this.devProd
  let Observ      = this.obsRepass
  let codImp      =  this.data['codImp'];
  let codProblema =  this.data['codProblema'];
  let codProbSuc  =  this.data['codProbSuc'];

  const url = 'http://192.168.0.7:8080/cgi-bin/wspd_cgi.sh/WService=emswebelttst/scb005ws.p';
  let bigStringOut = '';  
		  bigStringOut = url + '?'     + 
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

  console.log(bigStringOut);


 }

  closeRepForm(): void {
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
