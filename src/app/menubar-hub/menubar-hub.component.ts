import {Component, OnInit} from '@angular/core';
import {AppAuthService} from "../app-auth.service";
import {Subscription} from "rxjs";
import {EventBusService, Events} from "../event-bus.service";

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

  //Subscription
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
  }

  ngOnDestroy():void{
    this.InOrderHubChangedSub?.unsubscribe()
  }

  showDropdownCategory(category_content: HTMLDivElement) {
    if (category_content.style.display == 'none') {
      category_content.style.display = 'block';
    } else if (category_content.style.display == 'block') {
      category_content.style.display = 'none';
    }
  }

  showDropdownShoppingCart(cart_content: HTMLDivElement) {
    if (cart_content.style.display == 'none') {
      cart_content.style.display = 'block';
    } else if (cart_content.style.display == 'block') {
      cart_content.style.display = 'none';
    }
  }
}
