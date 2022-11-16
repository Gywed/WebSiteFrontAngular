import { Component, OnInit } from '@angular/core';
import {DtoOutputOrderDate} from "./dtos/dto-output-order-date";
import {OrderService} from "./order.service";
import {DtoInputOrder} from "./dtos/dto-input-order";

@Component({
  selector: 'app-order-hub',
  templateUrl: './order-hub.component.html',
  styleUrls: ['./order-hub.component.css']
})
export class OrderHubComponent implements OnInit {
  orders : DtoInputOrder[] = []

  constructor(private _service: OrderService) { }

  ngOnInit(): void {
  }

  fetchOrderByDate(dto: DtoOutputOrderDate) {
    this._service.fetchOrderByDate(dto).subscribe(orders => this.orders = orders)
  }
}
