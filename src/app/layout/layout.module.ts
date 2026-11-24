import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from '../shared/avatar/avatar/avatar.module';
import { LayoutComponent } from './layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [LayoutComponent, NavbarComponent, SidebarComponent],
  imports: [CommonModule, RouterModule, ButtonModule, SidebarModule, AvatarModule]
})
export class LayoutModule {}
