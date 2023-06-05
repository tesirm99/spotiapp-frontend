import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { 

  }

  async login(username: string, password: string): Promise<boolean> {
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
    
    // TODO: login to Firebase
  }


  async register(email: string, password: string): Promise<boolean> {
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
      let accessInfo = await res.json();
      localStorage.setItem('token', accessInfo.token);
      localStorage.setItem('id', accessInfo.id);
      return true;
    } else {
      return false;
    }

    // TODO: register in Firebase
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
      return "Jane Doe";
    }

  }
}
