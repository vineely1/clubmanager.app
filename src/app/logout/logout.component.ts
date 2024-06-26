import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    await this.authService.logoff();
    this.router.navigate(['login']);
  }
}
