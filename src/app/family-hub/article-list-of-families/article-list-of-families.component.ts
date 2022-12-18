import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {DtoInputFamily} from "../dtos/dto-input-family";
import {FamilyService} from "../family.service";

@Component({
  selector: 'app-article-list-of-families',
  templateUrl: './article-list-of-families.component.html',
  styleUrls: ['./article-list-of-families.component.css']
})
export class ArticleListOfFamiliesComponent implements OnInit {
  families: DtoInputFamily[] = []

  @Input() id: number = 0;

  constructor(private _familyService: FamilyService,
              private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.fetchFamiliesOfArticle(this.id);
  }

  fetchFamiliesOfArticle(id: number){
    this._familyService.fetchFamiliesOfArticle(id).subscribe(listOfFamilies=> this.families = listOfFamilies)
  }
}
