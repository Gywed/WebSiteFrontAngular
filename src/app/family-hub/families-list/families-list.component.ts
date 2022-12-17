import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputFamily} from "../dtos/dto-input-family";
import {EventBusService, Events} from "../../event-bus.service";
import {Subscription} from "rxjs";
import {DtoInputArticle} from "../../dtos/dto-input-article";
import {DtoOutputCreateFamily} from "../dtos/dto-output-create-family";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-families-list',
  templateUrl: './families-list.component.html',
  styleUrls: ['./families-list.component.css']
})
export class FamiliesListComponent implements OnInit {
  form: FormGroup = this._fb.group({
    familyName: ["", Validators.required]
  })

  @Input() families: DtoInputFamily[] = []
  @Input() articlesInFamily: DtoInputArticle[] = []
  familySelectedId: number = 0
  isAdding: boolean = false

  @Output() familySelected: EventEmitter<DtoInputFamily> = new EventEmitter<DtoInputFamily>()
  @Output() familyCreated: EventEmitter<DtoOutputCreateFamily> = new EventEmitter<DtoOutputCreateFamily>()

  constructor(private _eventBus: EventBusService,
              private _fb: FormBuilder) { }

  ngOnInit(): void {

  }

  familyClicked(family: DtoInputFamily){
    if(this.familySelectedId == family.id){
      this.articlesInFamily = []
      this.familySelectedId = 0
    }else {
      this.familySelected.next(family)
      this.familySelectedId = family.id
    }

  }

  emitFamilyCreated(){
    this.familyCreated.next({
      familyName: this.form.value.familyName
    })
    this.form.reset()
    this.isAdding =false
  }

}
