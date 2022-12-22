import {Component, Input, OnInit} from '@angular/core';
import {DtoInputArticle} from "../../dtos/dto-input-article";
import {DtoOutputCartContent} from "../../menubar-hub/shopping-cart-hub/dtos/dto-output-cart-content";
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
    if(quantity > 0)
    {
      var articlesCart:DtoOutputCartContent = {
        article : {
          id:article.id,
          nametag:article.nametag,
          idBrand:article.brand.id,
          idCategory:article.category.id,
          price : article.price,
          pricingType : article.pricingType,
          imagePath : article.imagePath
        },
        quantity : quantity
      };
      this._shoppingCartService.addArticle(articlesCart);
    }

  }

  add(i: number) {

    if(!this.quantity[i])
    {
      this.quantity[i]=1;
    }
    else
      if(this.quantity[i]<99)
        this.quantity[i]++;
  }

  remove(i:number){
    if(this.quantity[i]>=1)
    {
      this.quantity[i]--;
    }
    else
      this.quantity[i]=0;
  }
}
