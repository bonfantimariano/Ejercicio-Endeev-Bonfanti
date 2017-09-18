import { Component, ViewChild  } from '@angular/core';
import { Platform, Events, AlertController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { UserData } from '../providers/user-data';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  @ViewChild('nav') nav: NavController;

    constructor(platform: Platform,
            statusBar: StatusBar,
            splashScreen: SplashScreen,
            public events: Events,
            private alertCtrl: AlertController,
            public userData: UserData,
            public storage: Storage) {
        platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          statusBar.styleDefault();
          splashScreen.hide();
        });

        // login status stored in local storage
        this.userData.hasLoggedIn().then((hasLoggedIn) => {
            if (hasLoggedIn) {
                this.rootPage = TabsPage;
            } else {
                this.rootPage = LoginPage;
            }
        });

        this.listenToLoginEvents();
    }

     listenToLoginEvents() {
      this.events.subscribe('user:login', () => {
          this.rootPage = TabsPage;
        });
          this.events.subscribe('user:errorLogin', () => {
              const alert = this.alertCtrl.create({
                  title: 'Error!',
                  message: 'usuario y/o contraseña incorrecta',
                  buttons: ['Ok']
              });
              alert.present();
          });

      this.events.subscribe('user:signup', () => {
        this.rootPage = TabsPage;
      });

      this.events.subscribe('user:logout', () => {
        this.rootPage = LoginPage;
      });
    }

    logOut() {
      this.userData.logout();
    }
}
