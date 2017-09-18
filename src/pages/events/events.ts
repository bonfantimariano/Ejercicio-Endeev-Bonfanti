import { Component } from '@angular/core';
import { NavController, ModalController, } from 'ionic-angular';
import { EventPage } from '../event/event';
import { UserData } from '../../providers/user-data';
import { EventsProvider } from '../../providers/events';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {
    events: any[];

  constructor(public navCtrl: NavController,
       public userData: UserData,
       public eventsProvider: EventsProvider,
       private modalCtrl: ModalController,) {
           this.loadItems();
  }

  loadItems(){
      this.events = this.eventsProvider.getEvents();
  }

  addItem() {
      let modal = this.modalCtrl.create(EventPage);
      modal.present();
      modal.onDidDismiss(
          refresh => {
              if (refresh) this.loadItems();
          })
      }

  onLoadEvent(event: any) {
      let modal = this.modalCtrl.create(EventPage, {mode: 'Edit', event: event});
      modal.present();
      modal.onDidDismiss(
          refresh => {
              if (refresh) this.loadItems();
          })
      }

  onRemove(event){
      this.eventsProvider.removeEventToList(event);
      this.loadItems();
  }

}
