import { Component, OnInit } from '@angular/core';
import {DtoOutputOrderDate} from "./dtos/dto-output-order-date";

@Component({
  selector: 'app-order-hub',
  templateUrl: './order-hub.component.html',
  styleUrls: ['./order-hub.component.css']
})
export class OrderHubComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  fetchOrderByDate($event: DtoOutputOrderDate) {

  }
}
