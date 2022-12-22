import {Component, OnInit} from '@angular/core';
import {DtoInputCategory} from "../../dtos/dto-input-category";
import {CategoryService} from "../category.service";
import {EmitEvent, EventBusService, Events} from "../../event-bus.service";

@Component({
  selector: 'app-category-hub',
  templateUrl: './category-hub.component.html',
  styleUrls: ['./category-hub.component.css']
})
export class CategoryHubComponent implements OnInit {
  categories:DtoInputCategory[]=[]

  constructor(private _categoryService: CategoryService,
              private _eventBus: EventBusService) { }

  ngOnInit(): void {
    this.fetchAll();
  }

  private fetchAll(){
    this._categoryService.fetchAllCategories().subscribe(categories=>this.categories=categories);
  }

  selectCategory(category: DtoInputCategory) {
    this._eventBus.emit(new EmitEvent(Events.emitCategory, category))
  }
}
