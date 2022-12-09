import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LocalService} from "../../local.service";
import {DtoInputArticle} from "../../article-hub/dtos/dto-input-article";
import {DtoOutputDeleteArticle} from "../dtos/dto-output-delete-article";
import {DtoOutputUpdateArticle} from "../../article-hub/dtos/dto-output-update-article";
import {DtoOutputFilterArticle} from "../dtos/dto-output-filter-article";
import {DtoInputCategory} from "../../order-hub/dtos/dto-input-category";
import {DtoInputBrand} from "../../order-hub/dtos/dto-input-brand";

@Component({
  selector: 'app-admin-list-article',
  templateUrl: './admin-list-article.component.html',
  styleUrls: ['./admin-list-article.component.css']
})
export class AdminListArticleComponent implements OnInit {
  // Flag for modyfing article
  @Input() updateArticleClick = false;
  @Output() updateArticleClickChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() articlesInPage: DtoInputArticle[] = []
  @Input() listOfCategories: DtoInputCategory[] = []
  @Input() listOfBrands: DtoInputBrand[] = []

  @Output()
  deletedArticle: EventEmitter<DtoOutputDeleteArticle> = new EventEmitter<DtoOutputDeleteArticle>()

  @Output()
  updatedArticle: EventEmitter<DtoOutputUpdateArticle> = new EventEmitter<DtoOutputUpdateArticle>()

  @Output()
  filteredArticle: EventEmitter<DtoOutputFilterArticle> = new EventEmitter<DtoOutputFilterArticle>()

  @Output()
  fetchArticle: EventEmitter<null> = new EventEmitter<null>()

  idToUpdate: number = 0;
  nametagToUpdate: string = "";
  priceToUpdate: number = 0;
  pricingTypeToUpdate: number = 0;
  stockToUpdate: number = 0;
  idCategoryToUpdate: number = 0;
  idBrandToUpdate: number = 0;

  // Flag for search
  searchingByName = false;

  nametagToSearch: string = "";

  // Flag for sort
  sortIncreasingArticleStock = false;

  constructor(private _localService : LocalService) { }

  ngOnInit(): void {
  }

  clickUpdateArticle(article: DtoInputArticle) {
    this.idToUpdate = article.id;
    this.nametagToUpdate = article.nametag;
    this.priceToUpdate = article.price;
    this.pricingTypeToUpdate = article.pricingType;
    this.stockToUpdate = article.stock;
    this.idCategoryToUpdate = article.idCategory;
    this.idBrandToUpdate = article.idBrand;
    this.updateArticleClick = true;
    this.updateArticleClickChange.next(this.updateArticleClick);
  }

  clickBackToList() {
    this.updateArticleClick = false;
  }

  emitDelete(article: DtoInputArticle) {
    this.deletedArticle.next({
      id: article.id
    })
  }

  emitUpdate(article: DtoOutputUpdateArticle) {
    this.updatedArticle.next( {
      id: article.id,
      nametag : article.nametag,
      price : article.price,
      pricingType : article.pricingType,
      stock : article.stock,
      idCategory : article.idCategory,
      idBrand : article.idBrand
    })
  }

  emitFilter() {
    this.searchingByName = this.nametagToSearch != "";

    if (this.searchingByName) {
      this.filteredArticle.next({
        nametag: this.nametagToSearch
      })
    } else {
      this.fetchArticle.next(null)
    }
  }

  sortArticleByStock() {
    if (this.sortIncreasingArticleStock) {
      this.articlesInPage.sort((a,b) => a.stock - b.stock);
    } else {
      this.articlesInPage.sort((a,b) => b.stock - a.stock);
    }
    this.sortIncreasingArticleStock = !this.sortIncreasingArticleStock;
  }
}
