import { Component, OnInit, Inject     } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { DialogData                    } from '../repFormModel';
import { MatSnackBar                   } from '@angular/material/snack-bar';
// import { DataRepOut                    } from './saveDataModel';
import { LoginService                  } from '../../login/login.service';
// import { HttpClient                    } from '@angular/common/http';
import { RepassadeiraService           } from '../repassadeira.service';
import { MonitoropService              } from '../../monitorop/monitorop.service'
import { DialogSelect                  } from './selectModel';

@Component({
     selector: 'app-select-rep',
  templateUrl: './select-rep.component.html',
    styleUrls:['./select-rep.component.scss']
})
export class SelectRepComponent implements OnInit {

  repassadeira = 'nulo';
   repassadeiras: string;

  constructor(
    public   dialogSelect: MatDialogRef<SelectRepComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogSelect,
        
  ) { }

  ngOnInit() {
    this.data.selectedRepass = 'its working!!!'
  }

  onNoClick(): void {
    this.data.selectedRepass = 'hello friend!!'
    this.dialogSelect.close(this.data.selectedRepass);
  }

  closeSelectForm(): void {    

    this.dialogSelect.close(this.data.selectedRepass);
  }



}
