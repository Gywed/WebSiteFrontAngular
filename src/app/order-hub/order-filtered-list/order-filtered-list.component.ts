import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputOrder} from "../dtos/dto-input-order";
import {DtoOutputOrderDate} from "../dtos/dto-output-order-date";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoOutputFilterOrder} from "../dtos/dto-output-filter-order";

@Component({
  selector: 'app-order-filtered-list',
  templateUrl: './order-filtered-list.component.html',
  styleUrls: ['./order-filtered-list.component.css']
})
export class OrderFilteredListComponent implements OnInit {
  @Input()
  orders : DtoInputOrder[] = []

  @Output()
  filterForFetch : EventEmitter<DtoOutputFilterOrder> = new EventEmitter<DtoOutputFilterOrder>();

  form: FormGroup = this._fb.group({
    date : ['', Validators.required],
  })

  constructor(private _fb : FormBuilder) { }

  ngOnInit(): void {
  }

  controls(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  emitDate() {
    this.filterForFetch.next({
      date : this.form.value.date
    });
}
