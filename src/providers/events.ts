import { Event } from "../interfaces/event";

export class EventsProvider {
    private events: Event[] = [];

    addEventToList(event: Event) {
        this.events.push(event);
        console.log(this.events);
    }

    editEvent(event: Event) {
        const position = this.events.findIndex((eventElem: Event) => {
            return eventElem.id == event.id;
        });
        console.log(position);
        this.events[position] = event;
        console.log(this.events);
    }

    removeEventToList(event: any) {
        const position = this.events.findIndex((eventElem: Event) => {
            return eventElem.id == event.id;
        });
        this.events.splice(position, 1);
    }

    getEvents(){
        return this.events.slice();
    }

}
