import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

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

  isLogged: boolean = false;
  userData: any = {};
  constructor(private authService: AuthService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    //getUserdata
    this.userData.name = "test";

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

  }

  login(value: { email: string; password: string; }) {

  }

  register() {

  }



}
