import { Component } from '@angular/core';
import {DtoOutputCreateUser} from "./user-hub/dtos/dto-output-create-user";
import {DtoOutputLogUser} from "./user-hub/dtos/dto-output-log-user";
import {UserService} from "./user-hub/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project';
  LoginActive = false;
  RegisterActive = false;
  AdminActive = false;
  ArticleActive = false;

  constructor(private _userService : UserService) { }

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

  createClient(dto: DtoOutputCreateUser) {
    this._userService.createClient(dto).subscribe();
  }

  login(dto: DtoOutputLogUser) {
    this._userService.login(dto).subscribe();
  }
}
