import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoOutputCreateUser} from "../dtos/dto-output-create-user";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  @Output()
  clientCreated: EventEmitter<DtoOutputCreateUser>
  = new EventEmitter<DtoOutputCreateUser>();

  form: FormGroup = this._fb.group({
    surname : ['', Validators.required],
    lastname : ['', Validators.required],
    email : ['', Validators.required],
    age : [1, Validators.required],
    password : ['', Validators.required]
});

  constructor(private _fb : FormBuilder) { }

  ngOnInit(): void {
  }

  emitUser() {
    this.clientCreated.next({
      surname: this.form.value.surname,
      lastname : this.form.value.lastname,
      email : this.form.value.email,
      age : this.form.value.age,
      password : this.form.value.password,
      permission : 0
    });
    this.form.reset();
  }

  controls(name: string): AbstractControl | null {
    return this.form.get(name);
  }
}
