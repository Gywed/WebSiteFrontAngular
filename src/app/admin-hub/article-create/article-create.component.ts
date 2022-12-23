import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoInputCategory} from "../../dtos/dto-input-category";
import {DtoInputBrand} from "../../dtos/dto-input-brand";
import {EmitEvent, EventBusService, Events} from "../../event-bus.service";
import * as Console from "console";

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {

  form: FormGroup = this._fb.group({
    nameTag : ['', Validators.required],
    price : ['', Validators.required],
    stock : ['', Validators.required],
    path : [''],
    file : File
  })

  idCategory = 1;
  idBrand = 1;
  idPricingType = 1;

  listOfCategories: DtoInputCategory[] = []
  listOfBrands: DtoInputBrand[] = []
  selectedFiles: File | undefined
  imageString : String = ""

  constructor(private _fb: FormBuilder, private _eventBus: EventBusService) { }

  ngOnInit(): void {
    this._eventBus.on(Events.emitFetchCategories).subscribe((data: any) => {
      this.listOfCategories = data.categories
    })
    this._eventBus.on(Events.emitfetchBranch).subscribe((data: any) => {
      this.listOfBrands = data.brands
    })
  }

  controls(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  emitArticle() {
    if (this.form.value.path == "") {
      this.form.value.path = "assets/articles/No-Image-Placeholder.png";
    }

    this._eventBus.emit(new EmitEvent(Events.createArticle,
      {
      nametag : this.form.value.nameTag,
      price : this.form.value.price,
      pricingtype : this.idPricingType,
      stock : this.form.value.stock,
      idcategory : this.idCategory,
      idbrand : this.idBrand,
      imagePath : this.form.value.path
    }))
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

  public fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  onFileSelected($event: Event) {
    if (this.form.value.file != undefined) {
      console.log($event)
      this.fileToBase64(this.form.value.file)
        .then(imageToBase64 => console.log(imageToBase64))
        .catch(error => console.error(error));
    }
  }
}
