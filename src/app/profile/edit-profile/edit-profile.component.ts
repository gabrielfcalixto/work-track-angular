import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {
  user: any = {};

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit(): void {
    this.profileService.getUser().subscribe(data => {
      this.user = data;
    });
  }

  saveProfile(): void {
    this.profileService.updateUser(this.user).subscribe(() => {
      this.router.navigate(['/profile']);
    });
  }
}
