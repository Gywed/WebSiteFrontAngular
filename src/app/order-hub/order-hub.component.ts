import { Component, OnInit } from '@angular/core';
import {DtoOutputOrderDate} from "./dtos/dto-output-order-date";
import {OrderService} from "./order.service";
import {DtoInputOrder} from "./dtos/dto-input-order";
import {DtoOutputFilterOrder} from "./dtos/dto-output-filter-order";
import {DtoOutputOrderCategory} from "./dtos/dto-output-order-category";

@Component({
  selector: 'app-order-hub',
  templateUrl: './order-hub.component.html',
  styleUrls: ['./order-hub.component.css']
})
export class OrderHubComponent implements OnInit {
  ordersDate : DtoInputOrder[] = []
  ordersFilterred : DtoInputOrder[] = []
  ordersCategory : DtoInputOrder[] = []

  constructor(private _service: OrderService) { }

  ngOnInit(): void {
  }

  fetchOrderByDate(dto: DtoOutputOrderDate) {
    this._service.fetchOrderByDate(dto).subscribe(orders => this.ordersDate = orders)
  }

  fetchOrderThroughFilter(dto: DtoOutputFilterOrder) {
    this._service.fetchFilteredOrder(dto).subscribe(orders => this.ordersFilterred = orders)
  }

  fetchOrderByCategory(dto: DtoOutputOrderCategory) {
    this._service.fetchOrderByCategory(dto).subscribe(orders => this.ordersCategory = orders)
  }
}
