import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor() { 

  }

  loginToFB(email: string, password: string) {
    // return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  loginToAPI(email: string, password: string) {

  }

  registerToFB(email: string, password: string) {
    // return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  registerToAPI(email: string, password: string) {
  }

  logoutFromFB() {
    // return this.afAuth.auth.signOut();
  }

  logoutFromAPI() {
  }
}
