import { ProfileService } from './profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = null; // Inicializa sem usuário

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    const userId = 1; // Troque pelo ID correto do usuário (futuramente, pode pegar do token JWT)
    this.profileService.getUserById(userId).subscribe((data) => {
      this.user = data;
    });
  }


  loadUserProfile(): void {
    this.profileService.getUser().subscribe(
      (data) => {
        this.user = data; // Preenche com os dados vindos do backend
      },
      (error) => {
        console.error('Erro ao carregar perfil:', error);
      }
    );
  }
}
