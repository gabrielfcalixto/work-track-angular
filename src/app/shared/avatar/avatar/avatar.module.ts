import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component'; // Importando o AvatarComponent
import { AvatarModule as PrimeNgAvatarModule } from 'primeng/avatar';


@NgModule({
  declarations: [AvatarComponent], // Declarando o AvatarComponent
  imports: [CommonModule,
    PrimeNgAvatarModule
  ],           // Importando CommonModule para funcionalidade básica do Angular
  exports: [AvatarComponent]         // Expondo o AvatarComponent para ser usado em outros módulos
})
export class AvatarModule { }
