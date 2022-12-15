import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputFamily} from "../dtos/dto-input-family";
import {EventBusService, Events} from "../../event-bus.service";
import {Subscription} from "rxjs";
import {DtoInputArticle} from "../../dtos/dto-input-article";

@Component({
  selector: 'app-families-list',
  templateUrl: './families-list.component.html',
  styleUrls: ['./families-list.component.css']
})
export class FamiliesListComponent implements OnInit {

  @Input() families: DtoInputFamily[] = []
  @Input() articlesInFamily: DtoInputArticle[] = []
  familySelectedId: number = 0

  @Output() familySelected: EventEmitter<DtoInputFamily> = new EventEmitter<DtoInputFamily>()

  constructor(private _eventBus: EventBusService) { }

  ngOnInit(): void {

  }

  familyClicked(family: DtoInputFamily){
    this.familySelected.next(family)
    this.familySelectedId = family.id
  }

}
