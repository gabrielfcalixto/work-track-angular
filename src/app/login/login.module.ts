import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
       CommonModule,
       CardModule,
       InputTextModule,
       ButtonModule,
       FormsModule,
       FloatLabelModule

  ]
})
export class AuthModule { }
