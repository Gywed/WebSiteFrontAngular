import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DtoOutputOrder} from "./shopping-cart-hub/dtos/dto-output-order";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private static readonly ENTRY_POINT = environment.apiUrl+"/orders";

  constructor(private _httpClient : HttpClient) { }

  CreateOrder(dto:DtoOutputOrder):Observable<DtoOutputOrder>{
    return this._httpClient.post<DtoOutputOrder>(OrderService.ENTRY_POINT, dto);
  }
}
