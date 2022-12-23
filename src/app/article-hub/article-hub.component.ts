import {Component, OnInit} from '@angular/core';
import {DtoInputArticle} from "../dtos/dto-input-article";
import {ArticleService} from "./article.service";
import {EmitEvent, EventBusService, Events} from "../event-bus.service";
import {DtoInputCategory} from "../dtos/dto-input-category";
import {Subscription} from "rxjs";
import {LocalService} from "../local.service";

@Component({
  selector: 'app-article-hub',
  templateUrl: './article-hub.component.html',
  styleUrls: ['./article-hub.component.css']
})
export class ArticleHubComponent implements OnInit {
  articles: DtoInputArticle[] = [];

  isMobile: boolean=false;

  filter = "";
  idCategory = -1;

  //Subscription
  emitCategoryListener?: Subscription
  emitFetchArticleListener?:Subscription
  emitShowCategoryListener?:Subscription

  constructor(private _articleService: ArticleService,
              private _eventBus: EventBusService,
              private _localService : LocalService) {
  }

  ngOnInit(): void {
    this.fetchAll();

    this.emitFetchArticleListener = this._eventBus.on(Events.emitArticleFilterParam)
      .subscribe((data) => {
        this.filter = data;
        this.fetchAll();
      });

    this.emitCategoryListener = this._eventBus.on(Events.emitCategory)
      .subscribe((data: DtoInputCategory) => {
        this.idCategory = data.id;
        this.fetchAll();
      })

    this.emitShowCategoryListener = this._eventBus.on(Events.showCategory)
      .subscribe(CategoryActive=>this.isMobile=CategoryActive)

    this.isMobile = !window.matchMedia("(min-width: 900px)").matches;

    window.onresize = () => {
      this.isMobile = this.showCategory();
    };
  }

  ngOnDestroy(): void {
    this.emitCategoryListener?.unsubscribe()
    this.emitFetchArticleListener?.unsubscribe()
    this.emitShowCategoryListener?.unsubscribe()
  }

  private fetchAll() {
    if (this.idCategory == -1) {
      this.fetchArticleByFilter(this.filter);
    } else {
      this.fetchArticleByCategory(this.filter, this.idCategory);
    }
  }

  fetchArticleByCategory(filter: string, idcategory:number){
    if (filter == "") {
      this._articleService.fetchArticleByCategory(idcategory).subscribe(listOfArticles=> {
        this.articles = listOfArticles
        this._eventBus.emit(new EmitEvent(Events.fetchArticle, {
          articles: listOfArticles
        }))
      })
    } else {
      this._articleService.fetchArticleByCategoryAndFilter(filter, idcategory).subscribe(listOfArticles=> {
        this.articles = listOfArticles
        this._eventBus.emit(new EmitEvent(Events.fetchArticle, {
          articles: listOfArticles
        }))
      })
    }
  }

  fetchArticleByFilter(filter: string){
    if (filter == "") {
      this._articleService.fetchAllArticle().subscribe(listOfArticles=> {
        this.articles = listOfArticles
        this._eventBus.emit(new EmitEvent(Events.fetchArticle, {
          articles: listOfArticles
        }))
      })
    } else {
      this._articleService.fetchFilteredArticle(filter).subscribe(listOfArticles=> {
        this.articles = listOfArticles
        this._eventBus.emit(new EmitEvent(Events.fetchArticle, {
          articles: listOfArticles
        }))
      })
    }
  }

  showCategory():boolean {
    return !window.matchMedia("(min-width: 900px)").matches;
  }
}
