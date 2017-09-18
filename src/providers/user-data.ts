import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserData {
  HAS_LOGGED_IN = 'hasLoggedIn';


  constructor(
    public events: Events,
    public storage: Storage
  ) {}


  login(username: string, password: string): void {
      this.storage.get('username').then((user) => {
          this.storage.get('password').then((pass) => {
              console.log(user + ' ' + pass);
              if (user === username && pass === password) {
                  this.storage.set(this.HAS_LOGGED_IN, true);
                  this.events.publish('user:login');
              } else {
                  this.events.publish('user:errorLogin');
              }
          });
      });
  };




  signup(username: string, password: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.setPassword(password);
    this.events.publish('user:signup');
  };

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    // this.storage.remove('username');
    // this.storage.remove('password');
    this.events.publish('user:logout');
  };

  setUsername(username: string): void {
    this.storage.set('username', username);
  };

  setPassword(password: string): void {
    this.storage.set('password', password);
  };

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

}
