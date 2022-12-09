import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoOutputCreateUser} from "../../user-hub/dtos/dto-output-create-user";

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  form: FormGroup = this._fb.group({
    surname : ['', Validators.required],
    lastname : ['', Validators.required],
    email : ['', Validators.required],
    birthdate : [Validators.required],
    password : ['', Validators.required]
  })

  @Output()
  employeeCreated: EventEmitter<DtoOutputCreateUser> = new EventEmitter<DtoOutputCreateUser>()

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
  }

  controls(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  emitEmployee() {
    this.employeeCreated.next({
      surname: this.form.value.surname,
      lastname : this.form.value.lastname,
      email : this.form.value.email,
      birthdate : this.form.value.birthdate,
      password : this.form.value.password
    })
    this.form.reset()
  }
}
