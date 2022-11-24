import { Component, OnInit } from '@angular/core';
import {UserService} from "../user-hub/user.service";
import {DtoOutputCreateUser} from "../user-hub/dtos/dto-output-create-user";
import {DtoOutputLogUser} from "../user-hub/dtos/dto-output-log-user";

@Component({
  selector: 'app-banner-hub',
  templateUrl: './banner-hub.component.html',
  styleUrls: ['./banner-hub.component.css']
})
export class BannerHubComponent implements OnInit {
  LoginActive = true;
  RegisterActive = false;
  AdminActive = false;
  ArticleActive = false;
  OrderActive = false;

  constructor(private _userService : UserService) { }

  createClient(dto: DtoOutputCreateUser) {
    this._userService.createClient(dto).subscribe();
  }

  login(dto: DtoOutputLogUser) {
    this._userService.login(dto).subscribe();
  }

  clickLogin() {
    this.RegisterActive = false;
    this.LoginActive = true;
  }

  clickRegister() {
    this.LoginActive = false;
    this.RegisterActive = true;
  }

  clickAdmin() {
    this.resetDisplay();
    this.AdminActive = true;
  }

  clickArticle() {
    this.resetDisplay();
    this.ArticleActive = true;
  }

  clickOrder() {
    this.resetDisplay();
    this.OrderActive = true;
  }

  clickLogo() {
    this.resetDisplay();
  }

  resetDisplay() {
    this.AdminActive = false;
    this.ArticleActive = false;
    this.OrderActive = false;
  }

  ngOnInit(): void {
  }


  showDropdown(content: HTMLDivElement) {
    if(content.style.display=='none'){
      content.style.display='block';
    }
    else if(content.style.display=='block'){
      content.style.display='none';
    }
  }
}
