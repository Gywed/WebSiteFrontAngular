import { Component, OnInit } from '@angular/core';
import {FamilyService} from "./family.service";
import {DtoInputFamily} from "./dtos/dto-input-family";
import {EmitEvent, EventBusService, Events} from "../event-bus.service";
import {DtoInputArticle} from "../dtos/dto-input-article";
import {DtoOutputCreateFamily} from "./dtos/dto-output-create-family";
import {DtoOutputDeleteFamily} from "./dtos/dto-output-delete-family";

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

  createFamily(dto: DtoOutputCreateFamily){
    this._familyService.createFamily(dto).subscribe(family => this.families.push(family))
  }

  deleteFamily(dto:DtoOutputDeleteFamily){
    let family = this.families.filter(e => e.id == dto.id)
    let index = this.families.indexOf(family[0])
    this._familyService.deleteFamily(dto)
      .subscribe(()=> this.families.splice(index, 1))
  }

}
