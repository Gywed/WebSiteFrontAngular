import { Component, OnInit } from '@angular/core';
import {DtoInputOrder} from "../../dtos/dto-input-order";
import {OrderService} from "../../order-hub/order.service";

@Component({
  selector: 'app-user-order-history',
  templateUrl: './user-order-history.component.html',
  styleUrls: ['./user-order-history.component.css']
})
export class UserOrderHistoryComponent implements OnInit {
  orders : DtoInputOrder[] = []


  constructor(private _orderService: OrderService) { }

  ngOnInit(): void {
    this.fetchOrderByUserId();
  }
  fetchOrderByUserId(){
    this._orderService.fetchOrderByUserId().subscribe(orders =>
      this.orders = orders
    )
  }

}
