import { Component } from '@angular/core';
import {
    NavParams,
    ViewController,
    LoadingController,
    AlertController
} from 'ionic-angular';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { EventsProvider } from '../../providers/events';
import { UserData } from '../../providers/user-data';
import { Event } from "../../interfaces/event";

@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
    mode = 'New';
    selectOptions = ['Green Friday', 'Dog´s Day', 'Meeting Room'];
    eventForm: FormGroup;
    event: Event;
    user: string;
    file: File = null;

    constructor (
        public viewCtrl: ViewController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        private eventsProvider: EventsProvider,
        private userData: UserData) {
            this.userData.getUsername().then(username =>{
             this.user = username;});
            this.initializeForm();
        }

        ngOnInit() {
            this.mode = this.navParams.get('mode');
            if (this.mode == 'Edit') {
                this.event = this.navParams.get('event');
            }
            this.initializeForm();
        }

        private initializeForm() {
            let eventType = 'Meeting Room';
            let eventDate = null;
            let eventTimeInit = null;
            let eventTimeEnd = null;
            let eventImage = null;


            if(this.mode == 'Edit') {
                eventType = this.event.type;
                eventDate = this.event.date;
                eventTimeInit = this.event.iniTime;
                eventTimeEnd = this.event.endTime;
                // eventImage = this.event.image;
            }
            this.eventForm = new FormGroup({
                'eventType': new FormControl(eventType),
                'eventDate': new FormControl(eventDate, Validators.required),
                'eventTimeInit': new FormControl(eventTimeInit, Validators.required),
                'eventTimeEnd': new FormControl(eventTimeEnd, Validators.required),
                'eventImage': new FormControl(eventImage)
            });

        }

        onSubmit() {
            const value = this.eventForm.value;

            console.log(value.eventImage);
            //Check mode open
            if (this.mode == 'Edit') {
                if(this.eventForm.dirty) {
                    //Edit event
                    const event: Event = {
                        id: this.event.id,
                        user: this.user,
                        type: value.eventType,
                        date: value.eventDate,
                        iniTime: value.eventTimeInit,
                        endTime: value.eventTimeEnd,
                        image: ''
                    };
                    this.eventsProvider.editEvent(event);
                    this.viewCtrl.dismiss(true);
                }
            //Create new event
            } else {
                const event: Event = {
                    id: Date.now().toString(),
                    user: this.user,
                    type: value.eventType,
                    date: value.eventDate,
                    iniTime: value.eventTimeInit,
                    endTime: value.eventTimeEnd,
                    image: ''
                };
                this.eventsProvider.addEventToList(event);
                this.viewCtrl.dismiss(true);
            }

            // if (this.file !== undefined) event.image = this.file.name;
            // console.log(event);

        }
        changeListener($event) : void {
           this.file = $event.target.files[0];
           console.log(this.file);
         }
        dismiss() {
            this.eventForm.reset();
            this.viewCtrl.dismiss(false);
        }

}
