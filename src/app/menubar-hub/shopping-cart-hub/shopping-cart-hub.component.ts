import { Component, OnInit } from '@angular/core';
import {OrderService} from "../order.service";
import {ShoppingCartService} from "./shopping-cart.service";
import {DtoOutputCartContent} from "./dtos/dto-output-cart-content";
import {DtoInputArticle} from "../../dtos/dto-input-article";
import {EmitEvent, EventBusService, Events} from "../../event-bus.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-cart-hub',
  templateUrl: './shopping-cart-hub.component.html',
  styleUrls: ['./shopping-cart-hub.component.css']
})
export class ShoppingCartHubComponent implements OnInit {
  articles:DtoInputArticle[]=[];

  orderContent:DtoOutputCartContent[]=[];
  quantity: number[]=[];
  i:number=0;

  //Subscription
  emitAddArticleToCartListener?:Subscription

  constructor(private _orderService: OrderService,
              private _shoppingCartService:ShoppingCartService,
              private _eventBus: EventBusService) { }

  ngOnInit(): void {

    this.emitAddArticleToCartListener = this._eventBus.on(Events.addArticleInCart)
      .subscribe((data:any)=>this.quantity[data.articleLength]=data.quantity)
    this.orderContent=this.fetchShoppingCart();
    this.articles=this.fetchArticleList();
    console.log(this.articles)

  }

  ngOnDestroy():void{
    this.emitAddArticleToCartListener?.unsubscribe()
  }

  private fetchShoppingCart():DtoOutputCartContent[]{

    return this._shoppingCartService.fetchShoppingCartList();
  }


  private fetchArticleList() {
    return this._shoppingCartService.fetchArticleList();
  }

  add(i: number) {
    this.actualiseTotal()
    if(!this.quantity[i])
    {
      this.quantity[i]=1;
      this.orderContent[i].quantity=1;

    }
    else
    if(this.quantity[i]<99){
      this.quantity[i]++;
      this.orderContent[i].quantity++;
    }
  }

  remove(i:number){
    this.actualiseTotal()
    if(this.quantity[i]>=1)
    {
      this.quantity[i]--;
      this.orderContent[i].quantity--;
    }
    else{
      this.quantity[i]=0;
      this.orderContent[i].quantity=0;
    }

  }

  actualiseTotal() {
    this._shoppingCartService.actualiseTotal();
    this._eventBus.emit(new EmitEvent(Events.addArticleInCart,this._shoppingCartService.total));
  }
}
