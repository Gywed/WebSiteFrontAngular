import { Injectable } from '@angular/core';
import {DtoOutputCartContent} from "./dtos/dto-output-cart-content";
import {ArticleService} from "../../article-hub/article.service";
import {DtoInputArticle} from "../../dtos/dto-input-article";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shoppingCartList : DtoOutputCartContent[]=[];
  articles:DtoInputArticle[]=[];
  total:number=0;

  constructor(private _articleService: ArticleService) { }

  addArticle(article:DtoOutputCartContent){
    var stop:boolean = false;
    for(let item of this.shoppingCartList)
    {
      if(item.article.id==article.article.id)
      {
        item.quantity+=article.quantity;
        stop = true;
        break;
      }
    }
    if(!stop)
    {
      this.shoppingCartList.push(article);
      this.total+=article.quantity*article.article.price;
      this.fetchArticleById(article.article.id);
    }
  }
 fetchShoppingCartList():DtoOutputCartContent[]{
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


  actualiseTotal() {
    this.total=0;
    for(let item of this.shoppingCartList)
    {
      this.total+=item.article.price*item.quantity;
    }
  }
}
