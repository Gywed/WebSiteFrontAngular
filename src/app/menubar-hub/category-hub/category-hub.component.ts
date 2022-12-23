import {Component, OnInit} from '@angular/core';
import {DtoInputCategory} from "../../dtos/dto-input-category";
import {CategoryService} from "../category.service";
import {EmitEvent, EventBusService, Events} from "../../event-bus.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-category-hub',
  templateUrl: './category-hub.component.html',
  styleUrls: ['./category-hub.component.css']
})
export class CategoryHubComponent implements OnInit {
  categories:DtoInputCategory[]=[]
  noCategorySelected:DtoInputCategory = {name: "no category", id: -1};
  CategoryActive:boolean = false
  btnStyle: string[] = [];
  //Subscription
  emitShowCategoryListener?:Subscription
  constructor(private _categoryService: CategoryService,
              private _eventBus: EventBusService) { }

  ngOnInit(): void {
    this.fetchAll();
    this.emitShowCategoryListener = this._eventBus.on(Events.showCategory)
      .subscribe(CategoryActive=>this.CategoryActive=CategoryActive)
  }

  ngOnDestroy():void{
    this.emitShowCategoryListener?.unsubscribe()
  }

  select(category: DtoInputCategory) {
    if (this.btnStyle[category.id] == 'btn-category-selected') {
      this.resetStyle();

      this.selectCategory(this.noCategorySelected);
    } else {
      this.resetStyle();

      this.btnStyle[category.id] = 'btn-category-selected';
      this.selectCategory(category);
    }
  }

  resetStyle() {
    for(let category of this.categories) {
      this.btnStyle[category.id] = 'btn-category';
    }
  }

  private fetchAll(){
    this._categoryService.fetchAllCategories().subscribe(categories=>this.categories=categories);
  }

  selectCategory(category: DtoInputCategory) {
    if (window.matchMedia("(min-width: 900px)").matches) {
      this._eventBus.emit(new EmitEvent(Events.emitCategory, category));
    }
    else
    {
      setTimeout(() => {
        this._eventBus.emit(new EmitEvent(Events.emitCategory, category));
        this._eventBus.emit(new EmitEvent(Events.showCategory, !this.CategoryActive));
      },300)
    }
  }


}
