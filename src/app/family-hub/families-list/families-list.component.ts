import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputFamily} from "../dtos/dto-input-family";
import {EventBusService, Events} from "../../event-bus.service";
import {Subscription} from "rxjs";
import {DtoInputArticle} from "../../dtos/dto-input-article";
import {DtoOutputCreateFamily} from "../dtos/dto-output-create-family";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoOutputDeleteFamily} from "../dtos/dto-output-delete-family";
import {DtoOutputRemoveFamilyArticle} from "../dtos/dto-output-remove-family-article";

@Component({
  selector: 'app-families-list',
  templateUrl: './families-list.component.html',
  styleUrls: ['./families-list.component.css']
})
export class FamiliesListComponent implements OnInit {
  createForm: FormGroup = this._fb.group({
    familyName: ["", Validators.required]
  })

  updateForm: FormGroup = this._fb.group({
    familyName: ["", Validators.required]
  })

  @Input() families: DtoInputFamily[] = []
  @Input() articlesInFamily: DtoInputArticle[] = []
  familySelectedId: number = 0
  isAdding: boolean = false
  familyUpdatedId: number = 0

  @Output() familySelected: EventEmitter<DtoInputFamily> = new EventEmitter<DtoInputFamily>()
  @Output() familyCreated: EventEmitter<DtoOutputCreateFamily> = new EventEmitter<DtoOutputCreateFamily>()
  @Output() familyDeleted: EventEmitter<DtoOutputDeleteFamily> = new EventEmitter<DtoOutputDeleteFamily>()
  @Output() articleFromFamilyRemoved: EventEmitter<DtoOutputRemoveFamilyArticle> = new EventEmitter<DtoOutputRemoveFamilyArticle>()

  constructor(private _eventBus: EventBusService,
              private _fb: FormBuilder) {
  }

  ngOnInit(): void {

  }

  familyClicked(family: DtoInputFamily) {
    if (this.familySelectedId == family.id) {
      this.articlesInFamily = []
      this.familySelectedId = 0
    } else {
      this.familySelected.next(family)
      this.familySelectedId = family.id
    }
    this.familyUpdatedId = 0
    this.updateForm.reset()

  }

  emitFamilyCreated() {
    this.familyCreated.next({
      familyName: this.createForm.value.familyName
    })
    this.createForm.reset()
    this.isAdding = false
  }

  emitFamilyDeleted(family: DtoInputFamily) {
    this.familyDeleted.next({
      id: family.id
    })
  }

  emitArticleFromFamilyRemoved(article: DtoInputArticle) {
    this.articleFromFamilyRemoved.next({
      idArticle: article.id,
      idFamily: this.familySelectedId
    })
  }

  emitFamilyUpdated() {

  }
}
