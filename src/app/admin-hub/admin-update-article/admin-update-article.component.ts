import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoOutputCreateArticle} from "../../article-hub/dtos/dto-output-create-article";

@Component({
  selector: 'app-admin-update-article',
  templateUrl: './admin-update-article.component.html',
  styleUrls: ['./admin-update-article.component.css']
})
export class AdminUpdateArticleComponent implements OnChanges {

  @Input() nametag: string = "";
  @Input() price: number = 0;
  @Input() pricingType: string = "";
  @Input() stock: number = 0;

  @Output()
  articleCreated: EventEmitter<DtoOutputCreateArticle> = new EventEmitter<DtoOutputCreateArticle>()

  form: FormGroup = this._fb.group({
    nameTag : ['', Validators.required],
    price : ['', Validators.required],
    pricingType : ['', Validators.required],
    stock : ['', Validators.required],
    idCategory : ['', Validators.required],
    idBrand : ['', Validators.required]
  })

  constructor(private _fb: FormBuilder) { }

  ngOnChanges(): void {
    this.form.setValue( {
      nameTag: this.nametag,
      price: this.price,
      pricingType: 1,
      stock: this.stock,
      idCategory: 1,
      idBrand: 1
    });
  }

  controls(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  emitUpdate() {
    this.articleCreated.next({
      nametag : this.form.value.nameTag,
      price : this.form.value.price,
      pricingtype : this.form.value.pricingType,
      stock : this.form.value.stock,
      idcategory : this.form.value.idCategory,
      idbrand : this.form.value.idBrand
    })
    this.form.reset();
  }
}
