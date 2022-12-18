import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppAuthService {

  private static readonly ENTRY_POINT_URL = environment.apiUrl +"/users";

  constructor(private _httpClient : HttpClient) { }

  CheckCookieAdmin() : Observable<boolean> {
    return this._httpClient.get<boolean>(AppAuthService.ENTRY_POINT_URL+"/isadmin");
  }

  CheckCookieEmployee() : Observable<boolean> {
    return this._httpClient.get<boolean>(AppAuthService.ENTRY_POINT_URL+"/isemployee");
  }

  CheckCookieClient() : Observable<boolean> {
    return this._httpClient.get<boolean>(AppAuthService.ENTRY_POINT_URL+"/isclient");
  }

}
