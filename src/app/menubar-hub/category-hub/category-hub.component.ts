import {Component, OnInit} from '@angular/core';
import {DtoInputCategory} from "./dtos/DtoInputCategory";
import {CategoryService} from "../category.service";

@Component({
  selector: 'app-category-hub',
  templateUrl: './category-hub.component.html',
  styleUrls: ['./category-hub.component.css']
})
export class CategoryHubComponent implements OnInit {
  categories:DtoInputCategory[]=[]

  constructor(private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this.fetchAll();
  }

  private fetchAll(){
    this._categoryService.fetchAllCategories().subscribe(categories=>this.categories=categories);
  }
}
