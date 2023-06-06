import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {

  }

  async login(email: string, password: string): Promise<boolean> {
    let res = await fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    let res2 = await this.afAuth.signInWithEmailAndPassword(email, password);
    console.log(res2);
    
    if(res.status == 200) {

      let accessInfo = await res.json();
      localStorage.setItem('token', accessInfo.token);
      localStorage.setItem('id', accessInfo.id);
      return true;
    } else {
      return false;
    }
  }


  async register(email: string, password: string): Promise<boolean> {
    let res = await fetch('http://localhost:3000/users/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    let res2 = await this.afAuth.createUserWithEmailAndPassword(email, password);
    console.log(res2);

    if(res.status == 200) {
      let accessInfo = await res.json();
      localStorage.setItem('token', accessInfo.token);
      localStorage.setItem('id', accessInfo.id);
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }

  isLogged(): boolean {
    if(localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  async getUser(): Promise<string> {
    let res = await fetch('http://localhost:3000/users/getById/' + localStorage.getItem('id'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')!
      },
    });

    if(res.status == 200) {
      let user = await res.text();
      return user;
    } else {
      return "jane@doe.com";
    }

  }
}
