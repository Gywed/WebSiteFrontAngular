import {Component, Input, OnInit} from '@angular/core';
import {DtoInputUser} from "../user-hub/dtos/dto-input-user";
import {DtoInputArticle} from "./dtos/dto-input-article";
import {ArticleService} from "./article.service";

@Component({
  selector: 'app-article-hub',
  templateUrl: './article-hub.component.html',
  styleUrls: ['./article-hub.component.css']
})
export class ArticleHubComponent implements OnInit {
  articles: DtoInputArticle[] = []

  constructor(private _articleService: ArticleService) { }

  ngOnInit(): void {
    this.fetchAll();
  }
  private fetchAll() {
    this._articleService.fetchAllArticle().subscribe(articles => this.articles = articles);
  }
}
