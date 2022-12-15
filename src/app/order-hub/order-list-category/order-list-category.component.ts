import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputOrder} from "../../dtos/dto-input-order";
import {DtoOutputOrderDate} from "../dtos/dto-output-order-date";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoOutputOrderCategory} from "../dtos/dto-output-order-category";
import {EmitEvent, EventBusService, Events} from "../../event-bus.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-order-list-category',
  templateUrl: './order-list-category.component.html',
  styleUrls: ['./order-list-category.component.css']
})
export class OrderListCategoryComponent implements OnInit {
  orders : DtoInputOrder[] = []

  fetchOrderByCategorySub? : Subscription

  form: FormGroup = this._fb.group({
    idCategory : ['', Validators.required],
  })

  constructor(private _fb : FormBuilder,
              private _eventBus: EventBusService) { }

  ngOnInit(): void {
    this.fetchOrderByCategorySub = this._eventBus.on(Events.fetchOrderByCategory).
    subscribe(orders => this.orders = orders);
  }

  controls(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  emitCategory() {
    this._eventBus.emit(new EmitEvent(Events.emitOrderCategory, {
      idCategory : this.form.value.idCategory
    }))
    this.form.reset();
  }

  ngOnDestroy(){
    this.fetchOrderByCategorySub?.unsubscribe()
  }
}
