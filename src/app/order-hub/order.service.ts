import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {DtoOutputOrderDate} from "./dtos/dto-output-order-date";
import {DtoInputOrder} from "./dtos/dto-input-order";
import {Observable} from "rxjs";
import {DtoOutputFilterOrder} from "./dtos/dto-output-filter-order";
import {DtoOutputOrderCategory} from "./dtos/dto-output-order-category";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private static readonly ENTRY_POINT = environment.apiUrl + "/orders";

  constructor(private _httpClient: HttpClient) { }

  fetchOrderByDate(dto : DtoOutputOrderDate): Observable<DtoInputOrder[]>{
    return this._httpClient.get<DtoInputOrder[]>(`${OrderService.ENTRY_POINT}/date/${dto.date}`)
  }

  fetchFilteredOrder(dto: DtoOutputFilterOrder) : Observable<DtoInputOrder[]> {
    let params = new HttpParams;
    if (!!dto.name)
      params = params.append("name",dto.name);
    if (!!dto.date)
      params = params.append("date",dto.date);

    return this._httpClient.get<DtoInputOrder[]>(`${OrderService.ENTRY_POINT}/filter?${params.toString()}`)
  }

  fetchOrderByCategory(dto: DtoOutputOrderCategory) : Observable<DtoInputOrder[]>
  {
    return this._httpClient.get<DtoInputOrder[]>(`${OrderService.ENTRY_POINT}/category/${dto.idCategory}`);
  }
}
