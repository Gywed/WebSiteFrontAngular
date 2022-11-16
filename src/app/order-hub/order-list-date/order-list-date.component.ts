import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputOrder} from "../dtos/dto-input-order";
import {DtoOutputOrderDate} from "../dtos/dto-output-order-date";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-order-list-date',
  templateUrl: './order-list-date.component.html',
  styleUrls: ['./order-list-date.component.css']
})
export class OrderListDateComponent implements OnInit {
  @Input()
  orders : DtoInputOrder[] = []

  @Output()
  dateForFetch : EventEmitter<DtoOutputOrderDate> = new EventEmitter<DtoOutputOrderDate>();

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
    this.dateForFetch.next({
        date : this.form.value.date
    });
  }
}
