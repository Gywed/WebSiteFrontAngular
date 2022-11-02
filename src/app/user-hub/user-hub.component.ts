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

  constructor(private _userService : UserService) { }

  ngOnInit(): void {
  }

  create(dto: DtoOutputCreateUser) {
    this._userService.create(dto).subscribe();
  }

  login(dto: DtoOutputLogUser) {
    this._userService.login(dto).subscribe();
  }
}
