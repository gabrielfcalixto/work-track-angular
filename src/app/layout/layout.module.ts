import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { PrimeNGModule } from '../prime-ng/prime-ng.module'; // Importando PrimeNGModule
import { AvatarModule } from '../shared/avatar/avatar/avatar.module';

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
    ButtonModule,
    RippleModule,
    StyleClassModule,
    PrimeNGModule, // Importando PrimeNGModule para usar componentes do PrimeNG
    AvatarModule  // Importando AvatarModule para usar o AvatarComponent
  ],
  providers: []
})
export class LayoutModule { }
