import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { 

  }

  loginToFB(email: string, password: string) {
    // return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async loginToAPI(username: string, password: string): Promise<boolean> {
    let res = await fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(res.status == 200) {

      let accessInfo = await res.json();
      localStorage.setItem('token', accessInfo.token);
      localStorage.setItem('id', accessInfo.id);
      return true;
    } else {
      return false;
    }
    // .then(async res => {
    //   let access = await res.json()
    //   localStorage.setItem('token', access.token);
    //   localStorage.setItem('id', access.id);
    //   return true;
    // })
    // .catch(error => {
    //   console.error('Error:', error)
    //   return false;
    // });
    
  }

  registerToFB(email: string, password: string) {
    // return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  async registerToAPI(email: string, password: string): Promise<boolean> {
    let res = await fetch('http://localhost:3000/users/signup', {
      method: 'POST',
      body: JSON.stringify({
        username: email,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(res.status == 200) {
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
}
