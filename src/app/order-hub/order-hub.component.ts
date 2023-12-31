import {Component, OnInit} from '@angular/core';
import {DtoOutputOrderDate} from "./dtos/dto-output-order-date";
import {OrderService} from "./order.service";
import {DtoInputOrder} from "../dtos/dto-input-order";
import {DtoOutputFilterOrder} from "./dtos/dto-output-filter-order";
import {DtoOutputUpdateOrdercontent} from "./dtos/dto-output-update-ordercontent";
import {EmitEvent, EventBusService, Events} from "../event-bus.service";
import {Subscription} from "rxjs";
import {DtoOutputDeleteOrder} from "./dtos/dto-output-delete-order";

@Component({
  selector: 'app-order-hub',
  templateUrl: './order-hub.component.html',
  styleUrls: ['./order-hub.component.css']
})
export class OrderHubComponent implements OnInit {
  orders : DtoInputOrder[] = []
  newPrepared : boolean = false

  emitOrderFilterSub? : Subscription;
  emitOrderDateSub? : Subscription;
  emitTodayOrderRequestSub? : Subscription;
  emitOrderCategorySub? : Subscription;
  updateOrderContentSub? : Subscription;
  emitUserSub? : Subscription;
  orderToHistorySentSub?: Subscription;
  orderCanceledSub?: Subscription

  constructor(private _orderService: OrderService,
              private _eventBus : EventBusService) { }

  ngOnInit(): void {
    //Listener
    this.emitOrderFilterSub = this._eventBus.on(Events.emitOrderFilter).subscribe((orders :  DtoOutputFilterOrder) => this.fetchOrderThroughFilter(orders))
    this.emitOrderDateSub = this._eventBus.on(Events.emitOrderDate).subscribe((orders :  DtoOutputOrderDate) => this.fetchOrderByDate(orders))
    this.emitUserSub = this._eventBus.on(Events.emitUser).subscribe(() => this.fetchOrderByUserId())
    this.updateOrderContentSub = this._eventBus.on(Events.updateOrderContent).subscribe((orders :  DtoOutputUpdateOrdercontent) => this.updateOrderContent(orders))
    this.emitTodayOrderRequestSub = this._eventBus.on(Events.emitTodayOrderRequest).subscribe(() => this.fetchTodayOrders())
    this.orderToHistorySentSub = this._eventBus.on(Events.orderToHistorySent).subscribe((order: DtoInputOrder) => this.sendOrderToHistory(order))
    this.orderCanceledSub = this._eventBus.on(Events.orderCanceled).subscribe((data:DtoOutputDeleteOrder) => this.cancelOrder(data))

    //Emitter
    this._eventBus.emit(new EmitEvent(Events.inOrderHubChanged, true))
  }

  fetchOrderByUserId(){
    this._orderService.fetchOrderByUserId().subscribe(orders => {
      this.orders = orders
      this._eventBus.emit(new EmitEvent(Events.fetchOrderByUserId, this.orders))
    })
  }

  fetchOrderByDate(dto: DtoOutputOrderDate) {
    this._orderService.fetchOrderByDate(dto).subscribe(orders => {
      this.orders = orders
      this._eventBus.emit(new EmitEvent(Events.fetchOrderByDate, this.orders))
    })
  }

  fetchTodayOrders() {
    this._orderService.fetchOrderByDate({date : new Date().toISOString()}).subscribe(orders => {
      this.orders = orders
      this._eventBus.emit(new EmitEvent(Events.fetchTodayOrder, this.orders))
    })
  }

  fetchOrderThroughFilter(dto: DtoOutputFilterOrder) {
    this._orderService.fetchFilteredOrder(dto).subscribe(orders => {
      this.orders = orders;
      this._eventBus.emit(new EmitEvent(Events.fetchOrderThroughFilter, this.orders))
    })
  }

  updateOrderContent(dto : DtoOutputUpdateOrdercontent){
    this._orderService.updateOrderContent(dto).subscribe(isFullyPrepared => this.newPrepared = isFullyPrepared)
  }

  sendOrderToHistory(dto: DtoInputOrder){
    let order = this.orders.filter(e => e.id == dto.id)
    let index = this.orders.indexOf(order[0])
    this._orderService.sendOrderToHistory(dto).subscribe(()=>this.orders.splice(index, 1))
  }

  cancelOrder(dto: DtoOutputDeleteOrder){
    let order = this.orders.filter(e => e.id == dto.idOrder)
    let index = this.orders.indexOf(order[0])
    this._orderService.cancelOrder(dto).subscribe(() => this.orders.splice(index, 1))
  }

  ngOnDestroy()
  {
    this.emitOrderCategorySub?.unsubscribe()
    this.emitOrderFilterSub?.unsubscribe()
    this.emitOrderDateSub?.unsubscribe()
    this.updateOrderContentSub?.unsubscribe()
    this.emitUserSub?.unsubscribe()
    this.orderToHistorySentSub?.unsubscribe()
    this.orderCanceledSub?.unsubscribe()

    this._eventBus.emit(new EmitEvent(Events.inOrderHubChanged, false))
  }
}
