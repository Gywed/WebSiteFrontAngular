import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {DtoOutputOrderDate} from "./dtos/dto-output-order-date";
import {DtoInputOrder} from "../dtos/dto-input-order";
import {Observable} from "rxjs";
import {DtoOutputFilterOrder} from "./dtos/dto-output-filter-order";
import {DtoOutputOrderCategory} from "./dtos/dto-output-order-category";
import {DtoOutputUpdateOrdercontent} from "./dtos/dto-output-update-ordercontent";
import {DtoOutputOrder} from "../menubar-hub/shopping-cart-hub/dtos/dto-output-order";
import {DtoOutputDeleteOrder} from "./dtos/dto-output-delete-order";

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

  updateOrderContent(dto: DtoOutputUpdateOrdercontent) : Observable<boolean>
  {
    return this._httpClient.patch<boolean>(OrderService.ENTRY_POINT+"/orderContent",dto)
  }

  fetchOrderByUserId(): Observable<DtoInputOrder[]>
  {
    return this._httpClient.get<DtoInputOrder[]>(`${OrderService.ENTRY_POINT}/client`);
  }

  sendOrderToHistory(dto: DtoInputOrder): Observable<DtoInputOrder>{
    return this._httpClient.post<DtoInputOrder>(OrderService.ENTRY_POINT + "/orderToHistory", {id: dto.id})
  }

  cancelOrder(dto: DtoOutputDeleteOrder):Observable<any>
  {
    return this._httpClient.request<any>('delete', OrderService.ENTRY_POINT, {body: dto})
  }
}
