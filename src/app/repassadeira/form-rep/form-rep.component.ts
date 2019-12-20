import { Component, OnInit, Inject     } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData                    } from '../repFormModel';
import { MatSnackBar                   } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-rep',
  templateUrl: './form-rep.component.html',
  styleUrls: ['./form-rep.component.scss']
})
export class FormRepComponent implements OnInit {

  indexCorteRol = 0;
  testeSpark = '';
  devProd = '';
  constructor(
    public repassForm: MatDialogRef<FormRepComponent>,
    public   snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
    console.log(this.data['mmValida'] );
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
              amostra){
         
  let corteBob = this.data['corteBob'];
  let corteRol = this.data['corteRol'];
  corteRol = corteRol[corteRol.length -1];
  let corteRet = this.data['corteRet'];
  let corteSuc = this.data['corteSuc'];
  

  console.log( op, cliente, codProd, descProd, dimBob, bobMad, lote, lance, obsOp, bobFinal, 
               podeVariar, varMax, varMin, qtdBob, qtdRolo, qtdRetalho, qtdSucata, corteBob,
               corteRol,corteRet,corteSuc, bobinaProd, roloProd, retalhoProd, 
               sucataProd, obsRepassadeira, amostra );
  }

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
