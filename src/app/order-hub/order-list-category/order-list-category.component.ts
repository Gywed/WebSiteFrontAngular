import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputOrder} from "../dtos/dto-input-order";
import {DtoOutputOrderDate} from "../dtos/dto-output-order-date";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoOutputOrderCategory} from "../dtos/dto-output-order-category";

@Component({
  selector: 'app-order-list-category',
  templateUrl: './order-list-category.component.html',
  styleUrls: ['./order-list-category.component.css']
})
export class OrderListCategoryComponent implements OnInit {
  @Input()
  orders : DtoInputOrder[] = []

  @Output()
  categoryForFetch : EventEmitter<DtoOutputOrderCategory> = new EventEmitter<DtoOutputOrderCategory>();

  form: FormGroup = this._fb.group({
    idCategory : ['', Validators.required],
  })

  constructor(private _fb : FormBuilder) { }

  ngOnInit(): void {
  }

  controls(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  emitCategory() {
    this.categoryForFetch.next({
      idCategory : this.form.value.idCategory
    });
  }
}
