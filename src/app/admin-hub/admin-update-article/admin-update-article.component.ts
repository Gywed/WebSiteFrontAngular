import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoOutputUpdateArticle} from "../../article-hub/dtos/dto-output-update-article";
import {DtoInputCategory} from "../../order-hub/dtos/dto-input-category";

@Component({
  selector: 'app-admin-update-article',
  templateUrl: './admin-update-article.component.html',
  styleUrls: ['./admin-update-article.component.css']
})
export class AdminUpdateArticleComponent implements OnChanges {
  //Flag for the validation message
  updated = false;

  @Input() id: number = 0;
  @Input() nametag: string = "";
  @Input() price: number = 0;
  @Input() pricingType: number = 0;
  @Input() stock: number = 0;
  @Input() idcategory: number = 0;
  @Input() idbrand: number = 0;

  @Input() listOfCategories: DtoInputCategory[] = []

  @Output()
  articleUpdated: EventEmitter<DtoOutputUpdateArticle> = new EventEmitter<DtoOutputUpdateArticle>()

  form: FormGroup = this._fb.group({
    nameTag : ['', Validators.required],
    price : ['', Validators.required],
    pricingType : ['', Validators.required],
    stock : ['', Validators.required],
    idBrand : ['', Validators.required]
  })

  idCategoryToUpdate = 0;
  idBrandToUpdate = 0;
  PricingTypeToUpdate = 0;

  constructor(private _fb: FormBuilder) { }

  ngOnChanges(): void {
    this.form.patchValue( {
      nameTag: this.nametag,
      price: this.price,
      pricingType: this.pricingType,
      stock: this.stock,
      idBrand: this.idbrand
    });
    this.updated = false
    this.idCategoryToUpdate = this.idcategory;
    this.idBrandToUpdate = this.idbrand;
    this.PricingTypeToUpdate = this.pricingType;
  }

  controls(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  emitUpdate() {
    this.articleUpdated.next({
      id : this.id,
      nametag : this.form.value.nameTag,
      price : this.form.value.price,
      pricingType : this.form.value.pricingType,
      stock : this.form.value.stock,
      idCategory : this.idCategoryToUpdate,
      idBrand : this.form.value.idBrand
    })
    this.updated = true;
  }

  setIdCategory(id: any) {
    this.idCategoryToUpdate = id.target.value;
  }

  setIdBrand(id: number) {
    this.idBrandToUpdate = id;
  }

  setPricingType(id: number) {
    this.PricingTypeToUpdate = id;
  }
}
