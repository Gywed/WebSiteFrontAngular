import {Component, OnInit} from '@angular/core';
import {LocalService} from "../../local.service";
import {DtoInputArticle} from "../../article-hub/dtos/dto-input-article";
import {EmitEvent, EventBusService, Events} from "../../event-bus.service";
import {debounceTime, Subject} from "rxjs";

@Component({
  selector: 'app-admin-list-article',
  templateUrl: './admin-list-article.component.html',
  styleUrls: ['./admin-list-article.component.css']
})
export class AdminListArticleComponent implements OnInit {
  articlesInPage: DtoInputArticle[] = []

  rangeDisplayed: number = 1;
  nbPages: number = 0;
  articlesDisplayed: DtoInputArticle[] = []

  // Flag for search
  searchingByName = false;
  nametagToSearch: string = "";

  searchNotifier = new Subject()

  // Flag for sorting
  sortIncreasingArticleStock = false;

  constructor(private _localService : LocalService,
              private _eventBus: EventBusService) { }

  ngOnInit(): void {
    this.searchNotifier
      .pipe(debounceTime(100))
      .subscribe(data=>this.emitFilter())

    this._eventBus.on(Events.fetchArticle).subscribe((data: any) => {
      this.articlesInPage = data.articles
      this.changeDisplayedRange(this.articlesInPage)
    })
    this.emitFilter()
    this.sortArticleByStock(this.articlesInPage)
  }

  clickUpdateArticle(article: DtoInputArticle) {
    this._eventBus.emit(new EmitEvent(Events.emitArticle, article))
  }

  emitDelete(article: DtoInputArticle) {
    this._eventBus.emit(new EmitEvent(Events.deleteArticle, article))
  }

  emitFilter() {
    this.searchingByName = this.nametagToSearch!=""

    this._eventBus.emit(new EmitEvent(Events.updateArticleList, this.nametagToSearch))
    this._eventBus.on(Events.fetchArticle).subscribe((data: any) => {
      this.changeDisplayedRange(data.articles)
    })
  }

  sortArticleByStock(articlesInPage: DtoInputArticle[]) {
    if (this.sortIncreasingArticleStock) {
      articlesInPage.sort((a,b) => a.stock - b.stock);
    } else {
      articlesInPage.sort((a,b) => b.stock - a.stock);
    }
    this.sortIncreasingArticleStock = !this.sortIncreasingArticleStock;
    this.rangeDisplayed = 1;
    this.articlesInPage = articlesInPage;
    this.changeDisplayedRange(articlesInPage)
  }

  createPageNumberRange(){
    // return new Array(number);
    return new Array(this.nbPages).fill(0)
      .map((n, index) => index + 1);
  }

  changeDisplayedRange(articlesInPage: DtoInputArticle[]) {
    this.nbPages = parseInt(((articlesInPage.length - 1) / 10).toString(), 10) + 1;
    this.articlesDisplayed = articlesInPage.slice((this.rangeDisplayed - 1) * 10, this.rangeDisplayed * 10);

      this.rangeDisplayed = 1;
  }
}
