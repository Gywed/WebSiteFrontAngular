import { Injectable } from '@angular/core';
import {filter, map, Observable, ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  //$ suffix means that it is an Observable
  private subject$ = new ReplaySubject<any>()

  constructor() { }

  on(event: Events): Observable<any> {
    return this.subject$
      .pipe( filter((e: EmitEvent) => e.name === event),
        map((e: EmitEvent) =>  e.value)
      )
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
  //EmployeeEvent
  fetchEmployeeInPages,
  updateEmployeeList,
  deleteEmployee,
  createEmployee,
  emitEmployee,
  employeeUpdate,

  //OrderEvent
  fetchOrderByDate,
  emitOrderDate,
  fetchOrderThroughFilter,
  emitOrderFilter,
  fetchOrderByCategory,
  emitOrderCategory,
  updateOrderContent
}
