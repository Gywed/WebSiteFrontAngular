import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputArticle} from "../dtos/dto-input-article";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private static readonly ENTRY_POINT = environment.apiUrl + "/articles";


  constructor(private _httpClient : HttpClient) { }

  fetchAllArticle():Observable<DtoInputArticle[]>{
    return this._httpClient.get<DtoInputArticle[]>(`${ArticleService.ENTRY_POINT}`);
  }

  fetchArticleById(id:number):Observable<DtoInputArticle>{
    return this._httpClient.get<DtoInputArticle>(`${ArticleService.ENTRY_POINT}/${id}`);
  }

  fetchArticleByCategory(idcategory:number):Observable<DtoInputArticle[]>{
    return this._httpClient.get<DtoInputArticle[]>(`${ArticleService.ENTRY_POINT}/categories/${idcategory}`);
  }

}
