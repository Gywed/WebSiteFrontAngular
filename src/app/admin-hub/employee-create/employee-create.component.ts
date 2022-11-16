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
    age : [1, Validators.required],
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
      firstname : this.form.value.firstname,
      email : this.form.value.email,
      age : this.form.value.age,
      password : this.form.value.password,
      permission : 1
    })
    //this.form.reset()
  }
}
