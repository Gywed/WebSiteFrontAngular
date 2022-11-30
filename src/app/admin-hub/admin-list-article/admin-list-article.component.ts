import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LocalService} from "../../local.service";
import {DtoInputArticle} from "../../article-hub/dtos/dto-input-article";
import {DtoOutputDeleteArticle} from "../dtos/dto-output-delete-article";

@Component({
  selector: 'app-admin-list-article',
  templateUrl: './admin-list-article.component.html',
  styleUrls: ['./admin-list-article.component.css']
})
export class AdminListArticleComponent implements OnInit {
  // Flag for modyfing article
  updateArticleClick = false;

  @Input() articlesInPage: DtoInputArticle[] = []

  @Output()
  deletedArticle: EventEmitter<DtoOutputDeleteArticle> = new EventEmitter<DtoOutputDeleteArticle>()

  nametagToUpdate: string = "";
  priceToUpdate: number = 0;
  pricingTypeToUpdate: string = "";
  stockToUpdate: number = 0;

  constructor(private _localService : LocalService) { }

  ngOnInit(): void {
  }

  clickUpdateArticle(article: DtoInputArticle) {
    this.nametagToUpdate = article.nametag;
    this.priceToUpdate = article.price;
    this.pricingTypeToUpdate = article.pricingtype;
    this.stockToUpdate = article.stock;
    this.updateArticleClick = true;
  }

  clickBackToList() {
    this.updateArticleClick = false;
  }

  emitDelete(article: DtoInputArticle) {
    this.deletedArticle.next({
      id: article.id
    })
  }
}
