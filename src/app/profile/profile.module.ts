import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { FormsModule } from '@angular/forms';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { FileUploadModule } from 'primeng/fileupload';
import { FieldsetModule } from 'primeng/fieldset';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProgressSpinnerModule,
    CardModule,
    AvatarModule,
    FileUploadModule,
    FieldsetModule,
    ToastModule,
    DialogModule,
    PasswordModule,
    InputTextModule
  ]
})
export class ProfileModule { }
