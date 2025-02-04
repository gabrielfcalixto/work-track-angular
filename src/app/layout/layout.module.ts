import { SidebarModule } from 'primeng/sidebar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { PrimeIcons } from 'primeng/api';
import { StyleClassModule } from 'primeng/styleclass';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    SidebarModule,
    ButtonModule,
     RippleModule,
      AvatarModule,
       StyleClassModule


  ]
})
export class LayoutModule { }
