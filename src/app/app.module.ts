import { BrowserModule           } from '@angular/platform-browser';
import { NgModule                } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

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
         MatInputModule          } from '@angular/material';

import { FormsModule             } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
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
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
