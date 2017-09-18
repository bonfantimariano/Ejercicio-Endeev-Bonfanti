import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { CalendarPage } from '../calendar/calendar';
import { EventsPage } from '../events/events';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = EventsPage;
  tab2Root = CalendarPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
