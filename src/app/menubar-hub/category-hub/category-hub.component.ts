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

  selectStyle(id: number) {
    this.resetStyle();

    this.btnStyle[id] = 'btn-category-selected';
  }

  resetStyle() {
    for(let i=0;i<this.categories.length;i++) {
      this.btnStyle[i] = 'btn-category';
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
