import { BrowserModule           } from '@angular/platform-browser';
import { NgModule                } from '@angular/core';
import { HttpClientModule        } from '@angular/common/http';
import { AppRoutingModule        } from './app-routing.module';
import { AppComponent            } from './app.component';
import { LoginComponent          } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule,
         MatButtonModule,
         MatToolbarModule,
         MatIconModule,
         MatGridListModule,
         MatCardModule,
         MatInputModule,
         MatSnackBarModule,
         MatMenuModule,
         MatTableModule,
         MatPaginatorModule,
         MatSortModule,
         MatTabsModule,
         MatSelectModule,
         MatProgressBarModule,
         MatProgressSpinnerModule,
         MatButtonToggleModule,
         MatExpansionModule,
         MatDialogModule,
         MatRadioModule,
         MatFormFieldModule,
         MatTooltipModule        } from '@angular/material';
import { FormsModule, 
         ReactiveFormsModule     } from '@angular/forms';
import { PrincipalComponent      } from './principal/principal.component';
import { MonitoropComponent      } from './monitorop/monitorop.component';
import { PrioridadePipe          } from './monitorop/prioridade.pipe';
import { RepassadeiraComponent, DialogOverviewExampleDialog   } from './repassadeira/repassadeira.component';
import { FormRepComponent        } from './repassadeira/form-rep/form-rep.component';
import { InputZeroPipe           } from './repassadeira/form-rep/input-zero.pipe';

// import {DialogOverviewExample, DialogOverviewExampleDialog} from './app/dialog-overview-example';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    MonitoropComponent,
    PrioridadePipe,
    RepassadeiraComponent,
    FormRepComponent,
    InputZeroPipe,
    DialogOverviewExampleDialog
  ],

  entryComponents: [FormRepComponent, DialogOverviewExampleDialog, RepassadeiraComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatDividerModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatDialogModule,
    MatRadioModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTooltipModule,    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
