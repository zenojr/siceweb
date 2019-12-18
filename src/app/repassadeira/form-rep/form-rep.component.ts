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

  constructor(
    public repassForm: MatDialogRef<FormRepComponent>,
    public   snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
    console.log(this.data['mmValida'] );
  }

  onNoClick(): void {
    this.repassForm.close();
  }

  nextBtn(){
    let controlStop = this.data['corteRol'];
    console.log( 'control lenght: ' + controlStop.length );
    console.log( 'indexControl: '   + this.indexCorteRol );
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
