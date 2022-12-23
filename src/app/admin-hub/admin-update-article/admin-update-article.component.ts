import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoInputCategory} from "../../dtos/dto-input-category";
import {DtoInputBrand} from "../../dtos/dto-input-brand";
import {EmitEvent, EventBusService, Events} from "../../event-bus.service";
import {Subscription} from "rxjs";
import {DtoInputArticle} from "../../dtos/dto-input-article";
import {DtoOutputUpdateArticle} from "../../article-hub/dtos/dto-output-update-article";

@Component({
  selector: 'app-admin-update-article',
  templateUrl: './admin-update-article.component.html',
  styleUrls: ['./admin-update-article.component.css']
})
export class AdminUpdateArticleComponent implements OnInit, AfterViewInit {
  @ViewChild('imageInput', { static: false }) imageInput: ElementRef<HTMLInputElement> | undefined;
  //Flag for the validation message
  updated = false;

  id: number = 0;

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
  idPricingTypeToUpdate = 1;
  imagePath = "";
  newImageDataString : string = "";
  newImageDataStringToOutput : string = "";
  originalImageData : string = "";
  browse: string = "Browse...";

  constructor(private _fb: FormBuilder, private _eventBus: EventBusService) { }

  ngOnInit(): void {
    this.emitArticleSubs = this._eventBus.on(Events.emitArticle).subscribe((data: DtoInputArticle) => {
      this.form.patchValue( {
        nameTag: data.nametag,
        price: data.price,
        pricingType: data.pricingType,
        stock: data.stock
      });
      this.updated = false
      this.id = data.id;
      this.idCategoryToUpdate = data.category.id;
      this.idBrandToUpdate = data.brand.id;
      this.idPricingTypeToUpdate = data.pricingType;
      this.originalImageData = data.imageData
    })

    this._eventBus.on(Events.emitFetchCategories).subscribe((data: any) => {
      this.tmplistOfCategories = data.categories
    })
    this.listOfCategories = this.tmplistOfCategories

    this._eventBus.on(Events.emitfetchBranch).subscribe((data: any) => {
      this.tmplistOfBrands = data.brands
    })
    this.listOfBrands = this.tmplistOfBrands
  }

  ngAfterViewInit() {
    if (this.imageInput != undefined)
    {
      this.imageInput.nativeElement.addEventListener('change', () => {
        if (this.imageInput != undefined) {
          const images = this.imageInput.nativeElement.files;

          if (images != null)
          {
            const fileReader = new FileReader();
            fileReader.onload = () => {
              this.newImageDataString = fileReader.result as string;
              this.newImageDataStringToOutput = this.newImageDataString.slice(this.newImageDataString.indexOf(",")+1,this.newImageDataString.length)
              this.imagePath = "new"
            };
            fileReader.readAsDataURL(images[0]);
          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.emitArticleSubs?.unsubscribe()
  }

  controls(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  emitUpdate() {
    let updateCategory = this.listOfCategories.find(value => value.id == this.idCategoryToUpdate)
    if (updateCategory == undefined)
      return;
    let updateBrand = this.listOfBrands.find(value => value.id == this.idBrandToUpdate)
    if (updateBrand == undefined)
      return;

    let dto: DtoOutputUpdateArticle;
    dto = {
      id : this.id,
      nametag : this.form.value.nameTag,
      price : this.form.value.price,
      pricingType : this.idPricingTypeToUpdate,
      stock : this.form.value.stock,
      category : updateCategory,
      brand : updateBrand,
      imagePath : this.imagePath,
      imageData : this.originalImageData
    }
    if (this.imagePath = "new")
      dto.imageData = this.newImageDataStringToOutput

    this._eventBus.emit(new EmitEvent(Events.articleUpdate, dto));

    this.updated = true;
  }

  setIdCategory(id: any) {
    this.idCategoryToUpdate = id.target.value;
  }

  setIdBrand(id: any) {
    this.idBrandToUpdate = id.target.value;
  }

  setPricingType(id: any) {
    this.idPricingTypeToUpdate = id.target.value;
  }

  getImage() {
    if (this.imagePath == "new")
      return this.newImageDataString;

    return this.originalImageData;
  }

  resetToOriginalImage() {
    this.imagePath = ""
  }
}
