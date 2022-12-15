import { Component, OnInit } from '@angular/core';
import {FamilyService} from "./family.service";
import {DtoInputFamily} from "./dtos/dto-input-family";
import {EmitEvent, EventBusService, Events} from "../event-bus.service";
import {DtoInputArticle} from "../dtos/dto-input-article";

@Component({
  selector: 'app-family-hub',
  templateUrl: './family-hub.component.html',
  styleUrls: ['./family-hub.component.css']
})
export class FamilyHubComponent implements OnInit {
  families: DtoInputFamily[] = []
  articlesOfFamily: DtoInputArticle[] = []

  constructor(private _familyService: FamilyService,
              private _eventBus: EventBusService) { }

  ngOnInit(): void {
    this.fetchAll()
  }

  ngDoCheck():void{
    console.log(this.families)
  }

  fetchAll(){
    this._familyService.fetchAll().subscribe(families=>{
      this.families = families
    })
  }

  fetchArticlesOfFamily(dto: DtoInputFamily){
    this._familyService.fetchArticlesOfFamily(dto.id).subscribe(articles => this.articlesOfFamily = articles)
  }

}
