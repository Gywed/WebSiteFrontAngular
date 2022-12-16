import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DtoOutputCreateUser} from "./dtos/dto-output-create-user";
import {Observable} from "rxjs";
import {DtoInputUser} from "./dtos/dto-input-user";
import {DtoOutputLogUser} from "./dtos/dto-output-log-user";
import {DtoInputUsername} from "./dtos/dto-input-username";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static readonly ENTRY_POINT = environment.apiUrl + "/users";

  constructor(private _httpClient : HttpClient ) { }

  createClient(dto : DtoOutputCreateUser) : Observable<DtoInputUser>{
    return this._httpClient.post<DtoInputUser>(`${UserService.ENTRY_POINT}/client`, dto);
  }

  login(dto : DtoOutputLogUser) : Observable<DtoInputUser>{
    return this._httpClient.post<DtoInputUser>(`${UserService.ENTRY_POINT}/login`, dto);
  }

  fetchUsernameByEmail():Observable<DtoInputUsername>{
    return this._httpClient.get<DtoInputUsername>(`${UserService.ENTRY_POINT}/`);
  }
}
