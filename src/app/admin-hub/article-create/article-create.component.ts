import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoOutputCreateArticle} from "../../article-hub/dtos/dto-output-create-article";
import {DtoInputCategory} from "../../order-hub/dtos/dto-input-category";

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {

  form: FormGroup = this._fb.group({
    nameTag : ['', Validators.required],
    price : ['', Validators.required],
    pricingType : ['', Validators.required],
    stock : ['', Validators.required],
    idBrand : ['', Validators.required]
  })

  idCategory = 0;
  idBrand = 0;
  PricingType = 0;

  @Output()
  articleCreated: EventEmitter<DtoOutputCreateArticle> = new EventEmitter<DtoOutputCreateArticle>()

  @Input() listOfCategories: DtoInputCategory[] = []

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
  }

  controls(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  emitArticle() {
    this.articleCreated.next({
      nametag : this.form.value.nameTag,
      price : this.form.value.price,
      pricingtype : this.form.value.pricingType,
      stock : this.form.value.stock,
      idcategory : this.idCategory,
      idbrand : this.form.value.idBrand
    })
    this.form.reset();
  }

  setIdCategory(id: any) {
    this.idCategory = id.target.value;
  }

  setIdBrand(id: number) {
    this.idBrand = id;
  }

  setPricingType(id: number) {
    this.PricingType = id;
  }
}
