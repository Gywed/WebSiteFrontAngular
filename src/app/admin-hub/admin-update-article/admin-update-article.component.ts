import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoOutputUpdateArticle} from "../../article-hub/dtos/dto-output-update-article";
import {DtoInputCategory} from "../../order-hub/dtos/dto-input-category";
import {DtoInputBrand} from "../../order-hub/dtos/dto-input-brand";

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
  @Input() listOfBrands: DtoInputBrand[] = []

  @Output()
  articleUpdated: EventEmitter<DtoOutputUpdateArticle> = new EventEmitter<DtoOutputUpdateArticle>()

  form: FormGroup = this._fb.group({
    nameTag : ['', Validators.required],
    price : ['', Validators.required],
    pricingType : ['', Validators.required],
    stock : ['', Validators.required],
  })

  idCategoryToUpdate = 1;
  idBrandToUpdate = 1;
  PricingTypeToUpdate = 1;

  constructor(private _fb: FormBuilder) { }

  ngOnChanges(): void {
    this.form.patchValue( {
      nameTag: this.nametag,
      price: this.price,
      pricingType: this.pricingType,
      stock: this.stock,
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
      idBrand : this.idBrandToUpdate
    })
    this.updated = true;
  }

  setIdCategory(id: any) {
    this.idCategoryToUpdate = id.target.value;
  }

  setIdBrand(id: any) {
    this.idBrandToUpdate = id.target.value;
  }

  setPricingType(id: number) {
    this.PricingTypeToUpdate = id;
  }
}
