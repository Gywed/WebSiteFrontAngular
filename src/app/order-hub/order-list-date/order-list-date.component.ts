import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputOrder} from "../dtos/dto-input-order";
import {DtoOutputOrderDate} from "../dtos/dto-output-order-date";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmitEvent, EventBusService, Events} from "../../event-bus.service";
import {DtoInputOrderContent} from "../dtos/dto-input-order-content";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-order-list-date',
  templateUrl: './order-list-date.component.html',
  styleUrls: ['./order-list-date.component.css']
})
export class OrderListDateComponent implements OnInit {
  orders : DtoInputOrder[] = []
  fetchOrderByDateSub? : Subscription

  form: FormGroup = this._fb.group({
    date : ['', Validators.required],
  })

  constructor(private _fb : FormBuilder,
              private _eventBus: EventBusService) { }

  ngOnInit(): void {
    this.fetchOrderByDateSub = this._eventBus.on(Events.fetchOrderByDate).
    subscribe(orders => this.orders = orders);
  }

  controls(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  emitDate() {
    this._eventBus.emit(new EmitEvent(Events.emitOrderDate, {
      date : this.form.value.date
    }))
    this.form.reset();
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
    this.fetchOrderByDateSub?.unsubscribe()
  }
}
