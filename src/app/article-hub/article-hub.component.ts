import {Component, OnInit} from '@angular/core';
import {DtoInputArticle} from "../dtos/dto-input-article";
import {ArticleService} from "./article.service";
import {EventBusService, Events} from "../event-bus.service";
import {DtoInputCategory} from "../dtos/dto-input-category";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-article-hub',
  templateUrl: './article-hub.component.html',
  styleUrls: ['./article-hub.component.css']
})
export class ArticleHubComponent implements OnInit {
  articles: DtoInputArticle[] = [];

  //Subscription
  emitCategoryListener?: Subscription
  emitFetchArticleListener?:Subscription

  constructor(private _articleService: ArticleService,
              private _eventBus: EventBusService) {
  }

  ngOnInit(): void {
    this.fetchAll();

    this.emitFetchArticleListener = this._eventBus.on(Events.fetchArticle)
      .subscribe(() => this.fetchAll());

    this.emitCategoryListener = this._eventBus.on(Events.emitCategory)
      .subscribe((data: DtoInputCategory) =>this.fetchArticleByCategory(data.id))
  }

  ngOnDestroy(): void {
    this.emitCategoryListener?.unsubscribe()
    this.emitFetchArticleListener?.unsubscribe()
  }

  private fetchAll() {
    this._articleService
      .fetchAllArticle()
      .subscribe(articles => this.articles = articles);
  }

  fetchArticleByCategory(idcategory:number){
    this._articleService
      .fetchArticleByCategory(idcategory)
      .subscribe(articles=>this.articles=articles);
  }


}
