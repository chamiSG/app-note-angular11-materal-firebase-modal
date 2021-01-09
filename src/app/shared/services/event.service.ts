import { Subject } from 'rxjs' ;
import { Injectable } from '@angular/core';
import { share } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EventService<T> {
    protected eventSubject = new Subject();
    public events = this.eventSubject.asObservable()
        .pipe(share());

    dispatchEvent(event) {
        this.eventSubject.next(event);
    }
}
