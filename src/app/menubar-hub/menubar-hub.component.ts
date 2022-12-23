import { Component, OnInit } from '@angular/core';
import {EmitEvent, EventBusService, Events} from "../event-bus.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-menubar-hub',
  templateUrl: './menubar-hub.component.html',
  styleUrls: ['./menubar-hub.component.css']
})
export class MenubarHubComponent implements OnInit {

  CategoryActive:boolean = false
  //Subscription
  emitShowCategoryListener?:Subscription
  constructor(private _eventBus: EventBusService) { }

  ngOnInit(): void {
    this.emitShowCategoryListener = this._eventBus.on(Events.showCategory)
      .subscribe(CategoryActive=>this.CategoryActive=CategoryActive)
  }



  showDropdownShoppingCart(cart_content: HTMLDivElement) {
    if(cart_content.style.display=='none'){
      cart_content.style.display='block';
    }
    else if(cart_content.style.display=='block'){
      cart_content.style.display='none';
    }
  }

  showCategory() {

    this._eventBus.emit(new EmitEvent(Events.showCategory, !this.CategoryActive));
  }
}
