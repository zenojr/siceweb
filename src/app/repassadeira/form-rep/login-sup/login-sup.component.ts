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

  constructor(
    public dialogLoginSup: MatDialogRef<LoginSupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginSupOut
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogLoginSup.close();
  }

}
