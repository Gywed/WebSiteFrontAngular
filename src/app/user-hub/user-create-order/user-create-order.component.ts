import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../menubar-hub/order.service";
import {ShoppingCartService} from "../../menubar-hub/shopping-cart-hub/shopping-cart.service";
import {DtoOutputCartContent} from "../../menubar-hub/shopping-cart-hub/dtos/dto-output-cart-content";
import {DtoOutputOrderContent} from "../../menubar-hub/shopping-cart-hub/dtos/dto-output-order-content";
import {DtoOutputOrder} from "../../menubar-hub/shopping-cart-hub/dtos/dto-output-order";
import {Router} from "@angular/router";
import {EventBusService, Events} from "../../event-bus.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-create-order',
  templateUrl: './user-create-order.component.html',
  styleUrls: ['./user-create-order.component.css']
})
export class UserCreateOrderComponent implements OnInit {
  cartContent:DtoOutputCartContent[]=[];
  orderContent:DtoOutputOrder[]=[];
  date:string="";
  total:number=0;

  //Subscription
  emitActualiseTotalSub?:Subscription;

  constructor(private _shoppingCartService: ShoppingCartService,
              private _orderService:OrderService,
              private _router: Router,
              private _eventBus:EventBusService) { }

  ngOnInit(): void {
    this.emitActualiseTotalSub = this._eventBus.on(Events.addArticleInCart)
      .subscribe(total=>this.total=Math.round(total*100)/100)
    this.cartContent=this.fetchShoppingCart();

    for(let article of this.cartContent){
      this.total+=article.article.price*article.quantity;
    }
    this.total = Math.round(this.total*100)/100;
  }

  private fetchShoppingCart():DtoOutputCartContent[]{

    return this._shoppingCartService.fetchShoppingCartList();
  }

  confirmOrder(orderContent:DtoOutputCartContent[],date:string) {

    var takedatetime = new Date(date);
    const today = new Date();
    today.setHours(today.getHours()+1);
    if(takedatetime>today)
    {
      var orderContents: DtoOutputOrderContent[]=[];
      for(let article of this.cartContent){
        orderContents.push({
          idarticle:article.article.id,
          quantity:article.quantity
        });
      }
      var dto:DtoOutputOrder = {
        takeDateTime:date,
        dtosOrderContents:orderContents
      }
      this._orderService.CreateOrder(dto).subscribe(order => this.orderContent.push(order));
      this._shoppingCartService.shoppingCartList.splice(0, this._shoppingCartService.shoppingCartList.length)
      this._shoppingCartService.articles.splice(0, this._shoppingCartService.articles.length)
      this._router.navigate(["order/orderUser"]);
    }
  }




  deleteArticle(article: DtoOutputCartContent) {
    for(let item of this.cartContent)
    {
      if(item==article)
      {
        this.cartContent.splice(this.cartContent.indexOf(article),1);
      }
    }
  }

  getTotal(price: number, quantity: number) {
    return Math.round((price * quantity) * 100) /100;
  }
}
