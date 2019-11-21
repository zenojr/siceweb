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
         MatProgressSpinnerModule} from '@angular/material';
import { FormsModule             } from '@angular/forms';
import { PrincipalComponent } from './principal/principal.component';
import { MonitoropComponent } from './monitorop/monitorop.component';
import { PrioridadePipe } from './monitorop/prioridade.pipe';
import { RepassadeiraComponent } from './repassadeira/repassadeira.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    MonitoropComponent,
    PrioridadePipe,
    RepassadeiraComponent
  ],
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
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
