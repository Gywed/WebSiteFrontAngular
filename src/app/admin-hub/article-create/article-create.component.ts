import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoInputCategory} from "../../dtos/dto-input-category";
import {DtoInputBrand} from "../../dtos/dto-input-brand";
import {EmitEvent, EventBusService, Events} from "../../event-bus.service";

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit, AfterViewInit {
  @ViewChild('imageInput', { static: false }) imageInput: ElementRef<HTMLInputElement> | undefined;

  form: FormGroup = this._fb.group({
    nameTag : ['', Validators.required],
    price : ['', Validators.required],
    stock : ['', Validators.required],
    path : ['']
  })

  idCategory = 1;
  idBrand = 1;
  idPricingType = 1;

  listOfCategories: DtoInputCategory[] = []
  listOfBrands: DtoInputBrand[] = []
  imageDataString : String = ""
  imagePath : String = ""

  constructor(private _fb: FormBuilder, private _eventBus: EventBusService) { }

  ngOnInit(): void {
    this._eventBus.on(Events.emitFetchCategories).subscribe((data: any) => {
      this.listOfCategories = data.categories
    })
    this._eventBus.on(Events.emitfetchBranch).subscribe((data: any) => {
      this.listOfBrands = data.brands
    })
  }

  ngAfterViewInit() {
    if (this.imageInput != undefined)
    {
      this.imageInput.nativeElement.addEventListener('change', (event) => {
        if (this.imageInput != undefined) {
          const images = this.imageInput.nativeElement.files;

          if (images != null)
          {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
              this.imageDataString = fileReader.result as string;
              this.imageDataString = this.imageDataString.slice(this.imageDataString.indexOf(",")+1,this.imageDataString.length)
              this.imagePath = "new"
            };
            fileReader.readAsDataURL(images[0]);
          }
        }
      });
    }
  }

  controls(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  emitArticle() {
    this._eventBus.emit(new EmitEvent(Events.createArticle,
      {
        nametag : this.form.value.nameTag,
        price : this.form.value.price,
        pricingtype : this.idPricingType,
        stock : this.form.value.stock,
        idcategory : this.idCategory,
        idbrand : this.idBrand,
        imagePath: this.imagePath,
        imageData : this.imageDataString
    }))
    this.imagePath = "";
    this.imageDataString = "";
    this.form.reset();
  }

  setIdCategory(id: any) {
    this.idCategory = id.target.value;
  }

  setIdBrand(id: any) {
    this.idBrand = id.target.value;
  }

  setPricingType(id: any) {
    this.idPricingType = id.target.value;
  }
}
