import {Component, Input, OnInit} from '@angular/core';
import {DtoInputFamily} from "../dtos/dto-input-family";
import {EventBusService, Events} from "../../event-bus.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-families-list',
  templateUrl: './families-list.component.html',
  styleUrls: ['./families-list.component.css']
})
export class FamiliesListComponent implements OnInit {

  @Input() families: DtoInputFamily[] = []

  constructor(private _eventBus: EventBusService) { }

  ngOnInit(): void {

  }

}
