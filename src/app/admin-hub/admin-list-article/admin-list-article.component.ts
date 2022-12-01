import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LocalService} from "../../local.service";
import {DtoInputArticle} from "../../article-hub/dtos/dto-input-article";
import {DtoOutputDeleteArticle} from "../dtos/dto-output-delete-article";
import {DtoOutputUpdateArticle} from "../../article-hub/dtos/dto-output-update-article";

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

  @Output()
  deletedArticle: EventEmitter<DtoOutputDeleteArticle> = new EventEmitter<DtoOutputDeleteArticle>()

  @Output()
  updatedArticle: EventEmitter<DtoOutputUpdateArticle> = new EventEmitter<DtoOutputUpdateArticle>()

  idToUpdate: number = 0;
  nametagToUpdate: string = "";
  priceToUpdate: number = 0;
  pricingTypeToUpdate: number = 0;
  stockToUpdate: number = 0;
  idCategoryToUpdate: number = 0;
  idBrandToUpdate: number = 0;

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
}
