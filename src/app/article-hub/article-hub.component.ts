import {Component, Input, OnInit} from '@angular/core';
import {DtoInputUser} from "../user-hub/dtos/dto-input-user";
import {DtoInputArticle} from "./dtos/dto-input-article";

@Component({
  selector: 'app-article-hub',
  templateUrl: './article-hub.component.html',
  styleUrls: ['./article-hub.component.css']
})
export class ArticleHubComponent implements OnInit {
  articles: DtoInputArticle[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
