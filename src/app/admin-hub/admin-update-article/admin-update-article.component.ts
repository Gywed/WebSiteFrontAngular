import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoInputCategory} from "../../order-hub/dtos/dto-input-category";
import {DtoInputBrand} from "../../order-hub/dtos/dto-input-brand";
import {EmitEvent, EventBusService, Events} from "../../event-bus.service";
import {Subscription} from "rxjs";
import {DtoInputArticle} from "../../article-hub/dtos/dto-input-article";

@Component({
  selector: 'app-admin-update-article',
  templateUrl: './admin-update-article.component.html',
  styleUrls: ['./admin-update-article.component.css']
})
export class AdminUpdateArticleComponent implements OnInit {
  //Flag for the validation message
  updated = false;

  id: number = 0;
  nametag: string = "";
  price: number = 0;
  pricingType: number = 0;
  stock: number = 0;

  // liste temporaire pour eviter un bug ou les listes ne changent pas
  tmplistOfCategories: DtoInputCategory[] = []
  tmplistOfBrands: DtoInputBrand[] = []

  listOfCategories: DtoInputCategory[] = []
  listOfBrands: DtoInputBrand[] = []

  emitArticleSubs?: Subscription

  form: FormGroup = this._fb.group({
    nameTag : ['', Validators.required],
    price : ['', Validators.required],
    pricingType : ['', Validators.required],
    stock : ['', Validators.required],
  })

  idCategoryToUpdate = 1;
  idBrandToUpdate = 1;
  PricingTypeToUpdate = 1;

  constructor(private _fb: FormBuilder, private _eventBus: EventBusService) { }

  ngOnInit(): void {
    this.emitArticleSubs = this._eventBus.on(Events.emitArticle).subscribe((data: DtoInputArticle) => {
      this.form.patchValue( {
        nameTag: data.nametag,
        price: data.price,
        pricingType: data.pricingType,
        stock: data.stock,
      });
      this.updated = false
      this.id = data.id;
      this.idCategoryToUpdate = data.idCategory;
      this.idBrandToUpdate = data.idBrand;
      this.PricingTypeToUpdate = data.pricingType;
    })

    this._eventBus.on(Events.fetchCategorie).subscribe((data: any) => {
      this.tmplistOfCategories = data.categories
    })
    this.listOfCategories = this.tmplistOfCategories

    this._eventBus.on(Events.fetchBrand).subscribe((data: any) => {
      this.tmplistOfBrands = data.brands
    })
    this.listOfBrands = this.tmplistOfBrands
  }

  ngOnDestroy(): void {
    this.emitArticleSubs?.unsubscribe()
  }

  controls(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  emitUpdate() {
    this._eventBus.emit(new EmitEvent(Events.articleUpdate, {
      id : this.id,
      nametag : this.form.value.nameTag,
      price : this.form.value.price,
      pricingType : this.form.value.pricingType,
      stock : this.form.value.stock,
      idCategory : this.idCategoryToUpdate,
      idBrand : this.idBrandToUpdate
    }))
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
