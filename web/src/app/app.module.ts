import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './login/login';
import { CanActivateApp } from './canActivateApp';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { canViewLogin } from './canViewLogin';
import { StoreModule } from '@ngrx/store';
import { ErrorDialog, HomeComponent } from './home/home';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { loginReducer } from './login/reducer';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ErrorDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    StoreModule.forRoot({ login: loginReducer })
  ],
  providers: [CanActivateApp, canViewLogin],
  bootstrap: [AppComponent]
})
export class AppModule { }
