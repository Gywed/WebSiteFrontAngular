import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoOutputLogUser} from "../dtos/dto-output-log-user";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  @Output()
  userLog : EventEmitter<DtoOutputLogUser>
  = new EventEmitter<DtoOutputLogUser>();


  form: FormGroup = this._fb.group({
    email : ['', Validators.required],
    password : ['', Validators.required]
  });

  constructor(private _fb : FormBuilder) { }

  ngOnInit(): void {
  }


  controls(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  emitCredential() {
    this.userLog.next({
      email : this.form.value.email,
      password : this.form.value.password
    });
    this.form.reset();
  }
}
