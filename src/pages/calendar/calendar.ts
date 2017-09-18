import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {

  constructor(public navCtrl: NavController, public userData: UserData) {

  }

  logOut () {
    this.userData.logout();
  }

}
