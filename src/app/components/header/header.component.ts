import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/logowanie/auth.service';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  rola: string | null = null;
  private roleSubscription!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.roleSubscription = this.authService.getUserRole().subscribe(role => {
      this.rola = role;
    });
  }

  ngOnDestroy() {
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
  }
}
