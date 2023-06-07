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
    'email': [
      { type: 'required', message: 'El email es un campo obligatorio.' },
      { type: 'pattern', message: 'El formato del email no es correcto.' }
    ],
   'password': [
     { type: 'required', message: 'La contraseña es un campo obligatorio.' },
     { type: 'minlength', message: 'La lóngitud mínima de una contraseña es 6 caracteres.' }
   ]
 };

  isInLogin: boolean = true;
  isLogged: boolean = false;
  userData: any = {};
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    //getUserdata
    this.userData.name = "test";

    this.authService.isLogged().subscribe(loggedIn => {
      this.isLogged = loggedIn;
      // Realiza cualquier acción adicional que necesites al cambiar el estado de autenticación
    });

    this.formValidation = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }
  
  logout() {
    this.authService.logout();
    this.isLogged = false;
    this.router.navigate(['/tabs/tab1']);
  }

  async login(value: { email: string; password: string; }) {

    if(this.isInLogin){
      console.log("login");
      this.isLogged = await this.authService.login(value.email, value.password);
      console.log(this.isLogged);
      if (this.isLogged) {
        this.router.navigate(['/tabs/tab1']);
      } else {
        this.errorMessage = "Usuario o contraseña incorrectos";
      }  
    } else {
      console.log("register");
      let register = await this.authService.register(value.email, value.password);
      console.log(register);
      if (register) {
        this.router.navigate(['/tabs/tab1']);
      } else {
        this.errorMessage = "Algo ha salido mal durante el registro";
      }
    }

    

  }

  async register(value: {email: string; password: string; }) {

    let registerOk = await this.authService.register(value.email, value.password);
    if (registerOk) {
      this.router.navigate(['/tabs/tab1']);
      // TODO: poner un toast de que se ha registrado correctamente y se ha autologeado
    } else {
      this.errorMessage = "No se ha podido registrar el usuario";
    }
  }

  goToRegister() {
    this.isInLogin = !this.isInLogin;
  }


}
