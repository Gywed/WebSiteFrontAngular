import { Component, OnInit } from '@angular/core';
import {EmitEvent, EventBusService, Events} from "../../event-bus.service";
import {DtoInputOrder} from "../../dtos/dto-input-order";
import {Subscription} from "rxjs";
import {DtoInputOrderContent} from "../../dtos/dto-input-order-content";

@Component({
  selector: 'app-order-list-today',
  templateUrl: './order-list-today.component.html',
  styleUrls: ['./order-list-today.component.css']
})
export class OrderListTodayComponent implements OnInit {
  orders : DtoInputOrder[] = []
  fetchTodayOrderSub? : Subscription

  constructor(private _eventBus: EventBusService) { }

  ngOnInit(): void {
    this.fetchTodayOrderSub = this._eventBus.on(Events.fetchTodayOrder).
    subscribe(orders => this.orders = orders);
    this.emitToday();
  }

  emitToday() {
    this._eventBus.emit(new EmitEvent(Events.emitTodayOrderRequest))
  }

  emitPreparedUpdate(order: DtoInputOrder, orderContent: DtoInputOrderContent) {
    this._eventBus.emit(new EmitEvent(Events.updateOrderContent, {
      orderid : order.id,
      articleid : orderContent.article.id,
      prepared : !orderContent.prepared
    }));
    orderContent.prepared = !orderContent.prepared
    order.isFullyPrepared = order.orderContents.every(o => o.prepared)
  }

  ngOnDestroy(){
    this.fetchTodayOrderSub?.unsubscribe()
  }

}
