import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoOutputUpdateUser} from "../../user-hub/dtos/dto-output-update-user";

@Component({
  selector: 'app-admin-update-employee',
  templateUrl: './admin-update-employee.component.html',
  styleUrls: ['./admin-update-employee.component.css']
})
export class AdminUpdateEmployeeComponent implements OnChanges {
  //Flag for the validation message
  updated = false;

  @Input() id: number = 0;
  @Input() surname: string = "";
  @Input() lastname: string = "";
  @Input() age: number = 0;
  @Input() permission: number = 0;

  @Output()
  employeeUpdated: EventEmitter<DtoOutputUpdateUser> = new EventEmitter<DtoOutputUpdateUser>()

  form: FormGroup = this._fb.group({
    surname: ['', Validators.required],
    lastname: ['', Validators.required],
    age: ['', Validators.required],
    permission: ['', Validators.required]
  })

  constructor(private _fb: FormBuilder) {
  }

  ngOnChanges(): void {
    this.form.patchValue({
      surname: this.surname,
      lastname: this.lastname,
      age: this.age,
      permission: this.permission
    });
    this.updated = false
  }

  controls(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  emitUpdate() {
    this.employeeUpdated.next({
      id: this.id,
      surname: this.form.value.surname,
      lastname: this.form.value.lastname,
      age: this.form.value.age,
      permission: this.form.value.permission
    })
    this.updated = true;
  }
}
