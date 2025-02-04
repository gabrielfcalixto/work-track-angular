import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importando FormsModule
import { LoginComponent } from './login/login.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';  // Importando InputTextModule
import { PrimeNGModule } from '../prime-ng/prime-ng.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    PrimeNGModule,
    FormsModule,
    FloatLabelModule,
    InputTextModule,  // Importando InputTextModule
  ]
})
export class AuthModule { }
