import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  
  tab3Text = 'Login';
  isLogged: boolean = false;
  
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLogged = this.authService.isLogged();
    if (this.isLogged) {
      this.tab3Text = 'Profile'
    } else {
      this.tab3Text = 'Login'
    }
  }

  ngDoCheck() {
    this.isLogged = this.authService.isLogged();
  }

}
