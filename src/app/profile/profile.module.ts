import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { FormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';


@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
