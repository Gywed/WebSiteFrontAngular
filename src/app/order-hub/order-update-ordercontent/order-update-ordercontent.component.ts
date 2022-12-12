import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoOutputUpdateOrdercontent} from "../dtos/dto-output-update-ordercontent";

@Component({
  selector: 'app-order-update-ordercontent',
  templateUrl: './order-update-ordercontent.component.html',
  styleUrls: ['./order-update-ordercontent.component.css']
})
export class OrderUpdateOrdercontentComponent implements OnInit {
  @Output()
  updatePrepared : EventEmitter<DtoOutputUpdateOrdercontent> = new EventEmitter<DtoOutputUpdateOrdercontent>();

  form: FormGroup = this._fb.group({
    orderid : ['', Validators.required],
    articleid : ['', Validators.required],
    prepared : [Validators.required]
  })

  constructor(private _fb : FormBuilder) { }

  ngOnInit(): void {
  }

  emitPrepared() {
    this.updatePrepared.next({
      orderid : this.form.value.orderid,
      articleid : this.form.value.articleid,
      prepared : this.form.value.prepared
      }
    )
  }
}
