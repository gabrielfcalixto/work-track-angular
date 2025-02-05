import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    username: 'johndoe',
    joinDate: '2022-01-01'
  };

  constructor() { }

  ngOnInit(): void {
  }
}
