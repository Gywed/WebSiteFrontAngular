import { Component, OnInit } from '@angular/core';
import {UserService} from "../user-hub/user.service";
import {DtoOutputCreateUser} from "../user-hub/dtos/dto-output-create-user";
import {DtoOutputLogUser} from "../user-hub/dtos/dto-output-log-user";
import {LocalService} from "../local.service";
import {EmitEvent, EventBusService, Events} from "../event-bus.service";

@Component({
  selector: 'app-banner-hub',
  templateUrl: './banner-hub.component.html',
  styleUrls: ['./banner-hub.component.css']
})
export class BannerHubComponent implements OnInit {
  LoginActive = true;
  RegisterActive = false;
  username:string="";

  constructor(private _userService : UserService,
              private _localService : LocalService,
              private _eventBus: EventBusService) { }

  createClient(dto: DtoOutputCreateUser) {
    this._userService.createClient(dto).subscribe();
  }

  login(dto: DtoOutputLogUser) {
    this._userService.login(dto).subscribe();
    this._localService.saveData("isLogged","logged");
    setTimeout(()=>{
      window.location.reload();
    },500)
  }

  fetchUsernameByEmail()
  {
    this._userService.fetchUsernameByEmail().subscribe(users=>this.username=users.surname);
  }

  clickLogin() {
    this.RegisterActive = false;
    this.LoginActive = true;
  }

  clickRegister() {
    this.LoginActive = false;
    this.RegisterActive = true;
  }



  ngOnInit(): void {
    console.log(this._localService.getData("isLogged"))
    if(this._localService.getData("isLogged")=="logged")
    {
      this.fetchUsernameByEmail();
    }
  }


  showDropdown(content: HTMLDivElement) {
    if(content.style.display=='none'){
      content.style.display='block';
    }
    else if(content.style.display=='block'){
      content.style.display='none';
    }
  }

  showDropdownLogged(Loggedcontent: HTMLDivElement) {
    if(Loggedcontent.style.display=='none'){
      Loggedcontent.style.display='block';
    }
    else if(Loggedcontent.style.display=='block'){
      Loggedcontent.style.display='none';
    }
  }

  logout() {
    this._userService.logout().subscribe();
    this._localService.removeData("isLogged");
    window.location.reload();
  }

  showArticles() {
    this._eventBus.emit(new EmitEvent(Events.fetchArticle))
  }
}
