import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, 
         MAT_DIALOG_DATA, 
         MatDialog         } from '@angular/material';
import { LoginSupOut       } from './loginSupModel';


@Component({
  selector: 'app-login-sup',
  templateUrl: './login-sup.component.html',
  styleUrls: ['./login-sup.component.scss']
})
export class LoginSupComponent implements OnInit {

         usuario = null;
           senha = null;
  arrayMotivoSuc = [];
       motSucata: any;
         motivos: any;
       motivoOut: any;
          motivoSelected = 'option';
  constructor(
    public dialogLoginSup: MatDialogRef<LoginSupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginSupOut
  ) { }

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogLoginSup.close();
  }

    saveDataLogin(user, pass){
    console.log( 'here!!:' + this.motivoSelected);

    let arrDataSup = [];
    this.data.usuario = user;
    this.data.senha = pass;
    // this.data.motSucata = this.motivoSelected;
    arrDataSup.push(user);
    arrDataSup.push(pass);
    arrDataSup.push(this.motivoSelected);
    console.log(arrDataSup);
    this.dialogLoginSup.close( arrDataSup );
  }

  closeSupForm():void {
    this.dialogLoginSup.close();
  }



}
