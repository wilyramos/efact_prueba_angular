import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Logo } from "../logo/logo";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, Logo],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('auth_token_efact');
    sessionStorage.removeItem('auth_token_efact');
    this.router.navigate(['/login']);
  }
}
