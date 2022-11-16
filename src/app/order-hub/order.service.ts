import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DtoOutputOrderDate} from "./dtos/dto-output-order-date";
import {DtoInputOrder} from "./dtos/dto-input-order";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private static readonly ENTRY_POINT = environment.apiUrl + "/orders";

  constructor(private _httpClient: HttpClient) { }

  fetchOrderByDate(dto : DtoOutputOrderDate): Observable<DtoInputOrder[]>{
    return this._httpClient.get<DtoInputOrder[]>(`${OrderService.ENTRY_POINT}/${dto.date}`)
  }
}
