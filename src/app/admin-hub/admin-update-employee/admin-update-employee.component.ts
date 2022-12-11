import {Component, Input, OnChanges} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EmitEvent, EventBusService, Events} from "../../event-bus.service";
import {DtoInputCompleteUser} from "../../user-hub/dtos/dto-input-complete-user";

@Component({
  selector: 'app-admin-update-employee',
  templateUrl: './admin-update-employee.component.html',
  styleUrls: ['./admin-update-employee.component.css']
})
export class AdminUpdateEmployeeComponent {
  //Flag for the validation message
  updated = false;

  form: FormGroup = this._fb.group({
    surname: new FormControl("", Validators.required),
    lastname: ['', Validators.required],
    age: ['', Validators.required],
    email: ['', Validators.required],
    permission: ['', Validators.required]
  })

  constructor(private _fb: FormBuilder,
              private _eventBus: EventBusService) {
  }

  ngOnInit(): void {
    this._eventBus.on(Events.emitEmployee, (data: DtoInputCompleteUser) => this.setFormValue(data))



    this.updated = false
  }

  controls(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  setFormValue(data: DtoInputCompleteUser){
    console.log(data)
    this.form.patchValue({
      surname: "data.surname",
      lastname: "data.lastname",
      age: "birthdate",
      email: "data.email",
      permission: "1"
    })
  }
  emitUpdate() {
    this._eventBus.emit(new EmitEvent(Events.employeeUpdate, {
      id: -1,
      surname: this.form.value.surname,
      lastname: this.form.value.lastname,
      age: this.form.value.age,
      email: this.form.value.email,
      permission: this.form.value.permission
    }))
    this.updated = true;
  }
}
