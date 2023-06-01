import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  formValidation: FormGroup | undefined; 
  errorMessage: string = ''; 

  formValidationMessages = { 
   'username': [
     { type: 'required', message: 'El username es un campo obligatorio.' },
     { type: 'pattern', message: 'El formato del username no es correcto.' }
   ],
   'password': [
     { type: 'required', message: 'La contraseña es un campo obligatorio.' },
     { type: 'minlength', message: 'La lóngitud mínima de una contraseña es 6 caracteres.' }
   ]
 };

  isLogged: boolean = false;
  userData: any = {};
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    //getUserdata
    this.userData.name = "test";

    this.isLogged = this.authService.isLogged();

    this.formValidation = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(4),
        Validators.required
      ])),
    });
  }
  
  ngDoCheck() {
    this.isLogged = this.authService.isLogged();
  }

  logout() {
    this.authService.logout();
    this.isLogged = false;
    this.router.navigate(['/tabs/tab1']);
  }

  async login(value: { username: string; password: string; }) {
    this.isLogged = await this.authService.loginToAPI(value.username, value.password);
    console.log(this.isLogged);
    if (this.isLogged) {
      this.router.navigate(['/tabs/tab1']);
    } else {
      this.errorMessage = "Usuario o contraseña incorrectos";
    }

  }

  async register(value: {username: string; password: string; }) {

    let registerOk = await this.authService.registerToAPI(value.username, value.password);
    if (registerOk) {
      this.router.navigate(['/tabs/tab1']);
    } else {
      this.errorMessage = "No se ha podido registrar el usuario";
    }
  }



}
