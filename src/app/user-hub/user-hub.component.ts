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
  ngOnInit(): void {
  }

  constructor(private _userService : UserService) { }

  createClient(dto: DtoOutputCreateUser) {
    this._userService.createClient(dto).subscribe();
  }

  login(dto: DtoOutputLogUser) {
    this._userService.login(dto).subscribe();
  }
}
