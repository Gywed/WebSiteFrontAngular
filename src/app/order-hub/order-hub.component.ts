import { Component, OnInit } from '@angular/core';
import {DtoOutputOrderDate} from "./dtos/dto-output-order-date";
import {OrderService} from "./order.service";
import {DtoInputOrder} from "./dtos/dto-input-order";
import {DtoOutputFilterOrder} from "./dtos/dto-output-filter-order";
import {DtoOutputOrderCategory} from "./dtos/dto-output-order-category";
import {DtoOutputUpdateOrdercontent} from "./dtos/dto-output-update-ordercontent";
import {EmitEvent, EventBusService, Events} from "../event-bus.service";

@Component({
  selector: 'app-order-hub',
  templateUrl: './order-hub.component.html',
  styleUrls: ['./order-hub.component.css']
})
export class OrderHubComponent implements OnInit {
  ordersDate : DtoInputOrder[] = []
  ordersFilterred : DtoInputOrder[] = []
  ordersCategory : DtoInputOrder[] = []
  newPrepared : boolean = false

  constructor(private _service: OrderService,
              private _eventBus : EventBusService) { }

  ngOnInit(): void {
    this._eventBus.on(Events.fetchOrderThroughFilter).subscribe((orders :  DtoOutputFilterOrder) => this.fetchOrderThroughFilter(orders))
    this._eventBus.on(Events.fetchOrderByDate).subscribe((orders :  DtoOutputOrderDate) => this.fetchOrderByDate(orders))
    this._eventBus.on(Events.fetchOrderByCategory).subscribe((orders :  DtoOutputOrderCategory) => this.fetchOrderByCategory(orders))
    this._eventBus.on(Events.updateOrderContent).subscribe((orders :  DtoOutputUpdateOrdercontent) => this.updateOrderContent(orders))
  }

  fetchOrderByDate(dto: DtoOutputOrderDate) {
    this._service.fetchOrderByDate(dto).subscribe(orders => {
      this.ordersDate = orders
      this._eventBus.emit(new EmitEvent(Events.fetchOrderByDate, this.ordersDate))
    })
  }

  fetchOrderThroughFilter(dto: DtoOutputFilterOrder) {
    this._service.fetchFilteredOrder(dto).subscribe(orders => {
      this.ordersFilterred = orders
      this._eventBus.emit(new EmitEvent(Events.fetchOrderThroughFilter, this.ordersFilterred))
    })
  }

  fetchOrderByCategory(dto: DtoOutputOrderCategory) {
    this._service.fetchOrderByCategory(dto).subscribe(orders => {
      this.ordersCategory = orders
      this._eventBus.emit(new EmitEvent(Events.fetchOrderByCategory, this.ordersCategory))
    })
  }

  updateOrderContent(dto : DtoOutputUpdateOrdercontent){
    this._service.updateOrderContent(dto).subscribe(isFullyPrepared => this.newPrepared = isFullyPrepared)
  }
}
