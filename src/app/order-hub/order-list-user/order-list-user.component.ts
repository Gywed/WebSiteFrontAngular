import { Component, OnInit } from '@angular/core';
import {DtoInputOrder} from "../../dtos/dto-input-order";
import {EmitEvent, EventBusService, Events} from "../../event-bus.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-order-list-user',
  templateUrl: './order-list-user.component.html',
  styleUrls: ['./order-list-user.component.css']
})
export class OrderListUserComponent implements OnInit {
  orders : DtoInputOrder[] = []

  fetchOrderByUserIdSub? : Subscription;

  constructor(private _eventBus: EventBusService) { }

  ngOnInit(): void {

    this.fetchOrderByUserIdSub = this._eventBus.on(Events.fetchOrderByUserId).
    subscribe(orders => this.orders = orders);
    this.emitUser()
    this._eventBus.emit(new EmitEvent(Events.inOrderHubChanged, false))
  }

  emitUser() {
    this.orders = []
    this._eventBus.emit(new EmitEvent(Events.emitUser))
  }

  ngOnDestroy()
  {
    this.fetchOrderByUserIdSub?.unsubscribe()
  }
}
