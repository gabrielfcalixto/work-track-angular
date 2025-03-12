import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { FormsModule } from '@angular/forms';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { FieldsetModule } from 'primeng/fieldset';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from '../shared/avatar/avatar/avatar.module';


@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProgressSpinnerModule,
    CardModule,
    FileUploadModule,
    FieldsetModule,
    ToastModule,
    DialogModule,
    PasswordModule,
    InputTextModule,
        AvatarModule  // Importando AvatarModule para usar o AvatarComponent
  ]
})
export class ProfileModule { }
