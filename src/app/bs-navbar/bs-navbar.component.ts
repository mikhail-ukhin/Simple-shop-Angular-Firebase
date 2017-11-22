import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { AppUser } from '../models/app.user';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  constructor(public auth: AuthService) {
    this.auth.appUser$.subscribe(
      user => {
        this.appUser = user;
      }
    );
  }

  appUser: AppUser;

  logout() {
    this.auth.logout();
  }

}
