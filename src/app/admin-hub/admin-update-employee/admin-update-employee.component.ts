import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EmitEvent, EventBusService, Events} from "../../event-bus.service";
import {DtoInputCompleteUser} from "../../user-hub/dtos/dto-input-complete-user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-admin-update-employee',
  templateUrl: './admin-update-employee.component.html',
  styleUrls: ['./admin-update-employee.component.css']
})
export class AdminUpdateEmployeeComponent {
  //Flag for the validation message
  updated = false;

  //Subscription
  emitEmployeeSubs?: Subscription

  employeeToUpdateId: number = 0;

  form: FormGroup = this._fb.group({
    surname: new FormControl("", Validators.required),
    lastname: ['', Validators.required],
    age: ['', Validators.required],
    permission: ['', Validators.required]
  })

  constructor(private _fb: FormBuilder,
              private _eventBus: EventBusService) {
  }

  ngOnInit(): void {
    this.emitEmployeeSubs = this._eventBus.on(Events.emitEmployee).subscribe((data: DtoInputCompleteUser) => {
      this.setFormValue(data)
      this.employeeToUpdateId = data.id
    })
    this.updated = false
  }

  ngOnDestroy(): void {
    this.emitEmployeeSubs?.unsubscribe()
  }


  controls(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  setFormValue(data: DtoInputCompleteUser){
    console.log(data)
    this.form.patchValue({
      surname: data.surname,
      lastname: data.lastname,
      age: data.birthdate,
      permission: data.permission
    })
  }
  emitUpdate() {
    this._eventBus.emit(new EmitEvent(Events.employeeUpdate, {
      id: this.employeeToUpdateId,
      surname: this.form.value.surname,
      lastname: this.form.value.lastname,
      age: this.form.value.age,
      permission: this.form.value.permission
    }))
    this.updated = true;
  }
}
