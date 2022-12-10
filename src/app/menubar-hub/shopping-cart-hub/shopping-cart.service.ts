import { Injectable } from '@angular/core';
import {DtoOutputOrderContent} from "./dtos/dto-output-order-content";
import {ArticleService} from "../../article-hub/article.service";
import {DtoInputArticle} from "../../article-hub/dtos/dto-input-article";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shoppingCartList : DtoOutputOrderContent[]=[];
  articles:DtoInputArticle[]=[];

  constructor(private _articleService: ArticleService) { }

  addArticle(article:DtoOutputOrderContent){
    this.shoppingCartList.push(article);
    this.fetchArticleById(article.article.id);
  }
 fetchShoppingCartList():DtoOutputOrderContent[]{
    return this.shoppingCartList;
  }

  fetchArticleList():DtoInputArticle[]{
    return this.articles;
  }

  private fetchArticleById(id:number){
    this._articleService
      .fetchArticleById(id)
      .subscribe(article => this.articles.push(article));
  }
}
