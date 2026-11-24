import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from '../shared/avatar/avatar/avatar.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, FormsModule, AvatarModule, ButtonModule, CardModule, DialogModule, FieldsetModule,
    InputTextModule, ToastModule, RouterModule.forChild([{ path: '', component: ProfileComponent }])]
})
export class ProfileModule {}
