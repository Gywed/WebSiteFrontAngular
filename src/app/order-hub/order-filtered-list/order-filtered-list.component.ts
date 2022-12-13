import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputOrder} from "../dtos/dto-input-order";
import {DtoOutputOrderDate} from "../dtos/dto-output-order-date";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoOutputFilterOrder} from "../dtos/dto-output-filter-order";
import {DtoInputOrderContent} from "../dtos/dto-input-order-content";
import {DtoOutputUpdateOrdercontent} from "../dtos/dto-output-update-ordercontent";

@Component({
  selector: 'app-order-filtered-list',
  templateUrl: './order-filtered-list.component.html',
  styleUrls: ['./order-filtered-list.component.css']
})
export class OrderFilteredListComponent implements OnInit {
  @Input()
  orders : DtoInputOrder[] = []

  @Input()
  newPrepared : boolean = false;

  @Output()
  filterForFetch : EventEmitter<DtoOutputFilterOrder> = new EventEmitter<DtoOutputFilterOrder>();

  @Output()
  updatePrepared : EventEmitter<DtoOutputUpdateOrdercontent> = new EventEmitter<DtoOutputUpdateOrdercontent>();

  form: FormGroup = this._fb.group({
    date : ['', Validators.required],
    name : ['', Validators.required]
  })

  constructor(private _fb : FormBuilder) { }

  ngOnInit(): void {
  }

  controls(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  emitFilter() {
    this.filterForFetch.next({
      date: this.form.value.date,
      name : this.form.value.name
    });
    this.orders = []
  }

  emitPreparedUpdate(order: DtoInputOrder, orderContent: DtoInputOrderContent) {
    this.updatePrepared.next({
      orderid : order.id,
      articleid : orderContent.article.id,
      prepared : !orderContent.prepared
    })
    orderContent.prepared = !orderContent.prepared
    order.isFullyPrepared = order.orderContents.every(o => o.prepared)
  }
}


