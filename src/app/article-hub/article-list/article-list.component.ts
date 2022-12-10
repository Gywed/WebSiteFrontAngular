import {Component, Input, OnInit} from '@angular/core';
import {DtoInputArticle} from "../dtos/dto-input-article";
import {DtoOutputOrderContent} from "../../menubar-hub/shopping-cart-hub/dtos/dto-output-order-content";
import {ShoppingCartService} from "../../menubar-hub/shopping-cart-hub/shopping-cart.service";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  @Input() articles: DtoInputArticle[] = []
  quantity: number[]=[];


  constructor(private _shoppingCartService :ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart(article: DtoInputArticle,quantity:number) {
    var articlesCart:DtoOutputOrderContent = {
      article : {
        id:article.id,
        nametag:article.nametag,
        idBrand:article.idBrand,
        idCategory:article.idCategory,
        price : article.price,
        pricingType : article.pricingType
      },
      quantity : quantity
    };
    this._shoppingCartService.addArticle(articlesCart);
  }

}
