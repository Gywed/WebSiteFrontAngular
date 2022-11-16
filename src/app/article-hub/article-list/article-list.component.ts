import {Component, Input, OnInit} from '@angular/core';
import {DtoInputArticle} from "../dtos/dto-input-article";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  @Input() articles: DtoInputArticle[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
