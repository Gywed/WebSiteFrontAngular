import {Component, OnInit} from '@angular/core';
import {AppAuthService} from "../app-auth.service";
import {Subscription} from "rxjs";
import {EmitEvent, EventBusService, Events} from "../event-bus.service";

@Component({
  selector: 'app-menubar-hub',
  templateUrl: './menubar-hub.component.html',
  styleUrls: ['./menubar-hub.component.css']
})
export class MenubarHubComponent implements OnInit {
  isAdmin: boolean = false
  isEmployee: boolean = false
  isClient: boolean = false
  inOrderHub: boolean = false

  CategoryActive:boolean = false
  //Subscription
  emitShowCategoryListener?:Subscription
  InOrderHubChangedSub?: Subscription

  constructor(private _authService: AppAuthService,
              private _eventBus: EventBusService) {
  }

  ngOnInit(): void {
    this.inOrderHub = false
    this._authService.CheckCookieAdmin().subscribe(bool => this.isAdmin = bool)
    this._authService.CheckCookieEmployee().subscribe(bool => this.isEmployee = bool)
    this._authService.CheckCookieClient().subscribe(bool => this.isClient = bool)
    this.InOrderHubChangedSub = this._eventBus.on(Events.inOrderHubChanged).subscribe((bool: boolean) => this.inOrderHub = bool)
    this.emitShowCategoryListener = this._eventBus.on(Events.showCategory)
      .subscribe(CategoryActive=>this.CategoryActive=CategoryActive)
  }

  ngOnDestroy():void{
    this.InOrderHubChangedSub?.unsubscribe()
    this.emitShowCategoryListener?.unsubscribe()
  }



  showDropdownShoppingCart(cart_content: HTMLDivElement) {
    if (cart_content.style.display == 'none') {
      cart_content.style.display = 'block';
    } else if (cart_content.style.display == 'block') {
      cart_content.style.display = 'none';
    }
  }

  showCategory() {

    this._eventBus.emit(new EmitEvent(Events.showCategory, !this.CategoryActive));
  }
}
