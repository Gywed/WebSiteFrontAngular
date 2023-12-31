import { Component, OnInit } from '@angular/core';
import {EmitEvent, EventBusService, Events} from "../../event-bus.service";
import {DtoInputOrder} from "../../dtos/dto-input-order";
import {Subscription} from "rxjs";
import {DtoInputOrderContent} from "../../dtos/dto-input-order-content";
import {DtoOutputDeleteOrder} from "../dtos/dto-output-delete-order";

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
      idOrder : order.id,
      idArticle : orderContent.article.id,
      prepared : !orderContent.prepared
    }));
    orderContent.prepared = !orderContent.prepared
    order.isFullyPrepared = order.orderContents.every(o => o.prepared)
  }

  ngOnDestroy(){
    this.fetchTodayOrderSub?.unsubscribe()
  }

  sendOrderToHistory(order: DtoInputOrder) {
    this._eventBus.emit(new EmitEvent(Events.orderToHistorySent, order))
  }

  cancelOrder(order: DtoInputOrder) {
    let dto: DtoOutputDeleteOrder = {
      idOrder: order.id
    }
    this._eventBus.emit(new EmitEvent(Events.orderCanceled, dto))
  }
}
