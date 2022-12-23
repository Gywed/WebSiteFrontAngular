import {Component, OnInit} from '@angular/core';
import {DtoInputOrder} from "../../dtos/dto-input-order";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoInputOrderContent} from "../../dtos/dto-input-order-content";
import {EmitEvent, EventBusService, Events} from "../../event-bus.service";
import {debounceTime, Subject, Subscription} from "rxjs";
import {DtoOutputDeleteOrder} from "../dtos/dto-output-delete-order";

@Component({
  selector: 'app-order-filtered-list',
  templateUrl: './order-filtered-list.component.html',
  styleUrls: ['./order-filtered-list.component.css']
})
export class OrderFilteredListComponent implements OnInit {

  orders : DtoInputOrder[] = []

  searchNotifier = new Subject()
  fetchOrderThroughFilterSub? : Subscription

  form: FormGroup = this._fb.group({
    date : ['', Validators.required],
    name : ['', Validators.required]
  })

  constructor(private _fb : FormBuilder,
              private _eventBus: EventBusService) { }

  ngOnInit(): void {
    this.searchNotifier
      .pipe(debounceTime(1000))
      .subscribe(()=>this.emitFilter())

    this.emitFilter()

    this.fetchOrderThroughFilterSub = this._eventBus.on(Events.fetchOrderThroughFilter).
    subscribe(orders => this.orders = orders);

  }
  controls(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  emitFilter() {
    this._eventBus.emit(new EmitEvent(Events.emitOrderFilter,{
      date: this.form.value.date,
      name : this.form.value.name
    }));
    this.orders = []
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
    this.fetchOrderThroughFilterSub?.unsubscribe()
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


