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
    this.authService.isLogged().subscribe(loggedIn => {
      this.isLogged = loggedIn;
      if(this.isLogged) {
        this.tab3Text = 'Profile';
      } else {
        this.tab3Text = 'Login';
      }
      // Realiza cualquier acción adicional que necesites al cambiar el estado de autenticación
    });
  }

}
