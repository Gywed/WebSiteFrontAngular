import { Injectable } from '@angular/core';
import {filter, map, Subject, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  //$ suffix means that it is an Observable
  private subject$ = new Subject<any>()

  constructor() { }

  on(event: Events, action: any): Subscription {
    return this.subject$
      .pipe( filter((e: EmitEvent) => e.name === event),
        map((e: EmitEvent) =>  e.value)
      )
      .subscribe(action);
  }

  emit(event: EmitEvent) {
    this.subject$.next(event);
  }
}

export class EmitEvent {
  constructor(public name: any, public value?: any) {}
}

// this works like a communication channel
export enum Events {
  fetchEmployeeInPages,
  updateEmployeeList
}
