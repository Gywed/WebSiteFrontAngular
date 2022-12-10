import { Component, OnInit } from '@angular/core';
import {OrderService} from "../order.service";
import {ShoppingCartService} from "./shopping-cart.service";
import {DtoOutputOrderContent} from "./dtos/dto-output-order-content";
import {DtoInputArticle} from "../../article-hub/dtos/dto-input-article";

@Component({
  selector: 'app-shopping-cart-hub',
  templateUrl: './shopping-cart-hub.component.html',
  styleUrls: ['./shopping-cart-hub.component.css']
})
export class ShoppingCartHubComponent implements OnInit {
  articles:DtoInputArticle[]=[];

  orderContent:DtoOutputOrderContent[]=[];


  constructor(private _orderService: OrderService,private _shoppingCartService:ShoppingCartService) { }

  ngOnInit(): void {


    this.orderContent=this.fetchShoppingCart();
    this.articles=this.fetchArticleList();

    //this.articles =
  }

  private fetchShoppingCart():DtoOutputOrderContent[]{

    return this._shoppingCartService.fetchShoppingCartList();
  }


  private fetchArticleList() {
    return this._shoppingCartService.fetchArticleList();
  }
}
