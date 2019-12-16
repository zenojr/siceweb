import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../repFormModel';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-form-rep',
  templateUrl: './form-rep.component.html',
  styleUrls: ['./form-rep.component.scss']
})
export class FormRepComponent implements OnInit {

  

  constructor(
    public repassForm: MatDialogRef<FormRepComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
    console.log(this.data['corteRolo'] );
  }

  onNoClick(): void {
    this.repassForm.close();
  }

}
