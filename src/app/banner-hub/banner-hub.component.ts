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
  LoginActive = false;
  RegisterActive = false;
  AdminActive = false;
  ArticleActive = false;

  constructor(private _userService : UserService) { }

  createClient(dto: DtoOutputCreateUser) {
    this._userService.createClient(dto).subscribe();
  }

  login(dto: DtoOutputLogUser) {
    this._userService.login(dto).subscribe();
  }

  clickLogin() {
    this.resetDisplay();
    this.LoginActive = true;
  }

  clickRegister() {
    this.resetDisplay();
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

  clickLogo() {
    this.resetDisplay();
  }

  resetDisplay() {
    this.RegisterActive = false;
    this.AdminActive = false;
    this.LoginActive = false;
    this.ArticleActive = false;
  }

  ngOnInit(): void {
  }

}
