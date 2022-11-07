import { Component, OnInit } from '@angular/core';
import {DtoOutputCreateUser} from "./dtos/dto-output-create-user";
import {UserService} from "./user.service";
import {DtoOutputLogUser} from "./dtos/dto-output-log-user";

@Component({
  selector: 'app-user-hub',
  templateUrl: './user-hub.component.html',
  styleUrls: ['./user-hub.component.css']
})
export class UserHubComponent implements OnInit {
  LoginClick = false;
  RegisterClick = false;

  constructor(private _userService : UserService) { }

  ngOnInit(): void {
  }

  clickLogin() {
    this.LoginClick = !this.LoginClick;

    if (this.LoginClick) {
      this.RegisterClick = false;
    }
  }

  clickRegister() {
    this.RegisterClick = !this.RegisterClick;

    if (this.RegisterClick) {
      this.LoginClick = false;
    }
  }

  createClient(dto: DtoOutputCreateUser) {
    this._userService.createClient(dto).subscribe();
  }

  login(dto: DtoOutputLogUser) {
    this._userService.login(dto).subscribe();
  }
}
