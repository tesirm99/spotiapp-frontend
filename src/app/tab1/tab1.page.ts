import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  isLogged: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLogged = this.authService.isLogged();
  }

  ngDoCheck() {
    this.isLogged = this.authService.isLogged();
  }

  logout() {
    localStorage.removeItem('token');
    this.isLogged = false;
  }

  goToInsertSong() {
    console.log('Going to insert song');
    this.router.navigate(['/tabs/tab1/insertSong']);
  }
}
