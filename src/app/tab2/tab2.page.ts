import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  isLogged: boolean = false;
  constructor(private authService: AuthService) {}

  ngInit() {
    this.authService.isLogged().subscribe(loggedIn => {
      this.isLogged = loggedIn;
      // Realiza cualquier acción adicional que necesites al cambiar el estado de autenticación
    });
  }

  logout() {
    this.authService.logout();
  }

}
